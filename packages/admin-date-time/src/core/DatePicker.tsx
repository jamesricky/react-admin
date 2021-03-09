import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import { ClearInputButton, InputBase } from "@comet/admin";
import { ClickAwayListener, InputBaseProps, Paper, Popper, Typography, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import * as moment from "moment";
import * as React from "react";
import { DayPickerSingleDateController, DayPickerSingleDateControllerShape } from "react-dates";
import { FieldRenderProps } from "react-final-form";
import { useIntl } from "react-intl";

import { getDateFromInputValue, getLocaleFormattedDate } from "../utils/helpers";
import styles from "./DatePicker.styles";

export interface DatePickerThemeProps extends InputBaseProps {
    numberOfMonths?: number;
    showClearButton?: boolean;
    dateControllerProps?: DayPickerSingleDateController;
}

const Picker: React.FC<WithStyles<typeof styles> & DatePickerThemeProps & FieldRenderProps<Date, HTMLInputElement>> = ({
    classes,
    input,
    disabled,
    placeholder,
    fullWidth = false,
    showClearButton,
    dateControllerProps,
    inputProps,
    ...restProps
}) => {
    const intl = useIntl();
    const localeName = intl.locale;
    const locale = moment().locale(localeName);
    const localeDateFormat = locale.localeData().longDateFormat("L");
    const placeholderText = placeholder
        ? placeholder
        : intl.formatMessage({ id: "cometAdmin.dateTime.datePicker.placeholder", defaultMessage: "Date" });

    const { value, onChange, onBlur, onFocus, ...restInput } = input;

    const rootRef = React.useRef(null);
    const [showPopper, setShowPopper] = React.useState<boolean>(false);
    const [showDayPicker, setShowDayPicker] = React.useState<boolean>(false);
    const [currentUserInputValue, setCurrentUserInputValue] = React.useState<string | null>(null);

    const inputValue: Date | null = getDateFromInputValue(value, localeDateFormat);
    const formattedValue = getLocaleFormattedDate(inputValue, intl) ;

    const showPicker = () => {
        onFocus();
        setShowPopper(true);

        // Wait for the popper to be rendered, so the picker-height can be calculated
        // correctly https://github.com/airbnb/react-dates/issues/46#issuecomment-255059933
        setTimeout(() => setShowDayPicker(true), 0);
    };

    const hidePicker = () => {
        onBlur();
        setShowPopper(false);
        setShowDayPicker(false);
    };

    const onInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;

        if (newValue) {
            const newDateValue = getDateFromInputValue(newValue, localeDateFormat);

            if (newDateValue) {
                onChange(newDateValue);
                setCurrentUserInputValue(null);
            } else {
                onChange(null);
                setCurrentUserInputValue(null);
            }
        }
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value;
        if (newValue) {
            setCurrentUserInputValue(newValue);
        } else {
            onChange(null);
            setCurrentUserInputValue(null);
        }
    };

    const onDateChange: DayPickerSingleDateControllerShape["onDateChange"] = (date) => {
        onChange(date ? date.toDate() : null);
        hidePicker();
    };

    const rootClasses: string[] = [classes.root];
    if (disabled) rootClasses.push(classes.disabled);
    if (fullWidth) rootClasses.push(classes.fullWidth);

    return (
        <ClickAwayListener onClickAway={hidePicker}>
            <div ref={rootRef} className={rootClasses.join(" ")}>
                <InputBase
                    classes={{ root: classes.inputBase }}
                    endAdornment={showClearButton ? <ClearInputButton onClick={() => onChange(null)} disabled={!inputValue} /> : undefined}
                    disabled={disabled}
                    placeholder={placeholderText}
                    value={currentUserInputValue ? currentUserInputValue : formattedValue}
                    onFocus={showPicker}
                    onBlur={onInputBlur}
                    onChange={onInputChange}
                    inputProps={{
                        autoComplete: "off",
                        onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === "Tab") {
                                // Hide picker, if tab is pressed. This cannot be done in `onBlur` because the input-blur-event is also called,
                                // when clicking inside the picker and the picker would be hidden, before `onDateChange` could be called.
                                hidePicker();
                            }
                        },
                        ...inputProps,
                    }}
                    {...restProps}
                    {...restInput}
                />
                <Popper open={showPopper} anchorEl={rootRef.current} placement="bottom-start" keepMounted className={classes.popper} disablePortal>
                    <Paper>
                        <Typography component={"div"}>
                            {showDayPicker && (
                                <DayPickerSingleDateController
                                    date={inputValue ? moment(inputValue) : null}
                                    onDateChange={onDateChange}
                                    initialVisibleMonth={null}
                                    onFocusChange={() => {}}
                                    hideKeyboardShortcutsPanel
                                    focused
                                    {...dateControllerProps}
                                />
                            )}
                        </Typography>
                    </Paper>
                </Popper>
            </div>
        </ClickAwayListener>
    );
};

export const FinalFormDatePicker = withStyles(styles, { name: "CometAdminDatePicker" })(Picker);
