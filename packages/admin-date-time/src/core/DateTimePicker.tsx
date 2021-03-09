import { FormControl, FormLabel, WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import { isValid as isValidDate } from "date-fns";
import * as moment from "moment";
import * as React from "react";
import { FieldRenderProps } from "react-final-form";

import { DatePickerThemeProps, FinalFormDatePicker } from "./DatePicker";
import styles from "./DateTimePicker.styles";
import { FinalFormTimePicker, TimePickerProps } from "./TimePicker";

export interface DateTimePickerProps {
    fullWidth?: boolean;
    placeholder?: string;
    dateInputLabel?: string;
    timeInputLabel?: string;
    datePickerProps?: DatePickerThemeProps;
    timePickerProps?: TimePickerProps;
}

interface TimeValue {
    hours: number,
    minutes: number;
}

const DateTime: React.FC<WithStyles<typeof styles> & DateTimePickerProps & FieldRenderProps<string | Date, HTMLInputElement>> = ({
    classes,
    input,
    fullWidth = false,
    meta,
    dateInputLabel,
    timeInputLabel,
    disabled,
    datePickerProps,
    timePickerProps,
}) => {
    const [updatedDateValue, setUpdatedDateValue] = React.useState<Date | null>(null);
    const [updatedTimeValue, setUpdatedTimeValue] = React.useState<TimeValue | null>(null);

    // const { onChange, ...otherInput } = input;
    const {  ...otherInput } = input;
    const timeInputRef = React.useRef<HTMLInputElement>(null);
    const dateInputRef = React.useRef<HTMLInputElement>(null);

    const onChange = (i: any) => {
        console.log('aaa', 'onChange', {i});
        input.onChange(i);
    }

    React.useEffect(() => {
        setTimeout(() => {
            if (!input.value) {
                if (updatedDateValue) {
                    timeInputRef.current?.focus();
                } else if (updatedTimeValue) {
                    dateInputRef.current?.focus();
                }
            }
        }, 0);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedDateValue, updatedTimeValue])

    const updateValueWithNewDateAndTime = (date: Date, time: TimeValue) => {
        const newDateTimeValue = date;
        newDateTimeValue.setHours(time.hours);
        newDateTimeValue.setMinutes(time.minutes);
        onChange(newDateTimeValue);
        setUpdatedDateValue(null);
        setUpdatedTimeValue(null);
    }

    const onDateChange = (newDateValue: Date | null) => {
        if (!newDateValue) {
            onChange(null);
            return;
        }

        if (input.value && input.value instanceof Date && isValidDate(newDateValue)) {
            const hoursValue = input.value.getHours();
            const minutesValue = input.value.getMinutes();
            newDateValue.setHours(hoursValue);
            newDateValue.setMinutes(minutesValue);
            onChange(newDateValue);
            console.log('aaa', 'onDateChange', 1);
        } else if (updatedTimeValue) {
            updateValueWithNewDateAndTime(newDateValue, updatedTimeValue);
            setUpdatedTimeValue(null);
            console.log('aaa', 'onDateChange', 2);
        } else {
            setUpdatedDateValue(newDateValue);
            console.log('aaa', 'onDateChange', 3);
        }
    };

    const onTimeChange = (newTimeValue: string | null) => {
        if (!newTimeValue) {
            onChange(null);
            return;
        }

        const newTimeValueParts = newTimeValue.split(':');
        const hourValue = parseInt(newTimeValueParts[0]);
        const minuteValue = parseInt(newTimeValueParts[1]);

        const newTimeValueObj: TimeValue = { hours: hourValue, minutes: isNaN(minuteValue) ? 0 : minuteValue };
        console.log('aaa', 'onTimeChange', {newTimeValue, newTimeValueObj});

        if (input.value && input.value instanceof Date) {
            const newDateTimeValue = input.value;
            newDateTimeValue.setHours(newTimeValueObj.hours);
            newDateTimeValue.setMinutes(newTimeValueObj.minutes);
            onChange(newDateTimeValue);
            console.log('aaa', 'onTimeChange', 1, {newDateTimeValue});
        } else if (updatedDateValue) {
            updateValueWithNewDateAndTime(updatedDateValue, newTimeValueObj);
            setUpdatedDateValue(null);
            console.log('aaa', 'onTimeChange', 2);
        } else {
            setUpdatedTimeValue(newTimeValueObj);
            console.log('aaa', 'onTimeChange', 3);
        }
    };

    const momentValue = input.value && moment(input.value).isValid() ? moment(input.value) : null;
    const timeStringValue: string | null = momentValue?.isValid() ? momentValue.format("HH:mm") : null;

    const rootClasses: string[] = [classes.root];
    if (disabled) rootClasses.push(classes.disabled);
    if (fullWidth) rootClasses.push(classes.fullWidth);

    return (
        <div className={rootClasses.join(" ")}>
            <FormControl classes={{ root: classes.date }}>
                {dateInputLabel && <FormLabel disabled={disabled}>{dateInputLabel}</FormLabel>}
                <FinalFormDatePicker
                    input={{ ...otherInput, onChange: onDateChange, value: updatedDateValue ? updatedDateValue : input.value , inputProps: {ref: dateInputRef}}}
                    meta={meta}
                    disabled={disabled}
                    fullWidth
                    {...datePickerProps}
                />
            </FormControl>
            <FormControl classes={{ root: classes.time }}>
                {dateInputLabel && <FormLabel disabled={disabled}>{timeInputLabel}</FormLabel>}
                <FinalFormTimePicker
                    input={{ ...otherInput, onChange: onTimeChange, value: timeStringValue, inputProps: {ref: timeInputRef} }}
                    meta={meta}
                    disabled={disabled}
                    fullWidth
                    {...timePickerProps}
                />
            </FormControl>

            <pre style={{position: 'fixed', zIndex: 999, left: 20, bottom: 20, border: '1px solid white', background: 'black', padding: 10, color: 'white', maxWidth: 500}}>
                BUG: When choosing new time when input.value is already set, the time is not updated immediately.
                <br/>
                BUG: Popup does not always close when navigating with Tab-Key.
                <br/>
                <br/>
                {JSON.stringify({ updatedDateValue, updatedTimeValue, input }, null, 4)}
            </pre>
        </div>
    );
};

export const FinalFormDateTimePicker = withStyles(styles, { name: "CometAdminDateTimePicker" })(DateTime);
