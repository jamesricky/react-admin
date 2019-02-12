// tslint:disable:no-submodule-imports
import { format } from "date-fns";
import * as de from "date-fns/locale/de";
import * as React from "react";
import DatePickerOrig, { ReactDatePickerProps, registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FieldRenderProps } from "react-final-form";

registerLocale("de", de);

const onChangeAdapter = (origOnChange: <T>(event: React.ChangeEvent<T> | any) => void, showTimeSelect: boolean, date?: Date) => {
    origOnChange(date && format(date, showTimeSelect ? "yyyy-MM-dd HH:mm:ss" : "yyyy-MM-dd"));
};

interface IProps extends FieldRenderProps, ReactDatePickerProps {}
const DatePicker: React.FunctionComponent<IProps> = ({ input: { value, onChange, ...restInput }, meta, ...rest }) => {
    return (
        <DatePickerOrig
            locale="de"
            selected={value ? new Date(value) : null}
            onChange={onChangeAdapter.bind(this, onChange, !!rest.showTimeSelect)}
            {...restInput}
            {...rest}
        />
    );
};

export default DatePicker;
