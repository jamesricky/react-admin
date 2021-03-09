import { Field } from "@comet/admin";
import { DateRangePickerValue, FinalFormDateRangePicker } from "@comet/admin-date-time";
import TodayIcon from "@material-ui/icons/Today";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const Story = () => {
    const rangeStart = new Date();
    const rangeEnd = new Date();
    rangeStart.setDate(rangeStart.getDate() + 2);
    rangeEnd.setDate(rangeEnd.getDate() + 6);

    const range: DateRangePickerValue = { start: rangeStart, end: rangeEnd };
    const initialValues = { date2: range, date3: range, date4: range };

    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {({ values }) => (
                    <form style={{ width: 350 }}>
                        <Field name="date1" label="Date" component={FinalFormDateRangePicker} fullWidth />
                        <Field
                            name="date2"
                            label="Date, with icons"
                            component={FinalFormDateRangePicker}
                            startAdornment={<TodayIcon fontSize={"small"} />}
                            endAdornment={<TodayIcon fontSize={"small"} />}
                        />
                        <Field name="date3" label="Date, with clear-button" component={FinalFormDateRangePicker} showClearButton />
                        <Field
                            name="date4"
                            label="Date, required"
                            required
                            component={FinalFormDateRangePicker}
                            startAdornment={<TodayIcon fontSize={"small"} />}
                        />
                        <Field name="date5" label="Date, disabled" disabled component={FinalFormDateRangePicker} />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </form>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date Range Picker", () => <Story />);
