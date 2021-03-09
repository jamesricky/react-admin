import { Field } from "@comet/admin";
import { FinalFormDateTimePicker } from "@comet/admin-date-time";
import { storiesOf } from "@storybook/react";
import * as React from "react";
import { Form } from "react-final-form";
import { IntlProvider } from "react-intl";

const Story = () => {
    return (
        <IntlProvider messages={{}} locale="de">
            <Form onSubmit={() => {}}>
                {({values}) => (
                    <form style={{ width: 350 }}>
                        <Field
                            name="dateTime"
                            label={"Date Time"}
                            component={FinalFormDateTimePicker}
                        />
                        <pre>{JSON.stringify(values, null, 4)}</pre>
                    </form>
                )}
            </Form>
        </IntlProvider>
    );
};

storiesOf("@comet/admin-date-time", module).add("Date-Time Picker (Single)", () => <Story />);
