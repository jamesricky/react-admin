import { Field } from "@comet/admin";
import { FinalFormDateTimePicker } from "@comet/admin-date-time";
import { AccessTime, Today } from "@material-ui/icons";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const Story = () => {
    const dateNow = new Date();
    const initialValues = { dateTime2: dateNow, dateTime3: dateNow };

    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}} initialValues={initialValues}>
                {({values}) => (
                    <form style={{ width: 350 }}>
                        <Field
                            name="dateTime1"
                            dateInputLabel={"Date"}
                            timeInputLabel={"Time"}
                            component={FinalFormDateTimePicker}
                            datePickerProps={{ endAdornment: <Today fontSize={"small"} /> }}
                            timePickerProps={{ endAdornment: <AccessTime fontSize={"small"} /> }}
                            fullWidth
                        />
                        <Field name="dateTime2" label={"Date & Time"} component={FinalFormDateTimePicker} />
                        <Field name="dateTime3" label={"Date & Time"} component={FinalFormDateTimePicker} required />
                        <Field name="dateTime4" dateInputLabel={"Date"} timeInputLabel={"Time"} component={FinalFormDateTimePicker} disabled />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </form>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date-Time Picker", () => <Story />);
