import { isValid as isValidDate } from "date-fns";
import * as moment from "moment";
import { IntlShape } from "react-intl/src/types";

// TODO: Hook for stringLocale??
export const getDateFromInputValue = (date: Date | moment.Moment | string | null | undefined, stringLocale?: string ): Date | null => {
    if (!date) {
        return null;
    }

    if (date instanceof Date && isValidDate(date)) {
        return date;
    }

    if (moment.isMoment(date)) {
        const dateFromMoment = date.toDate();

        if (isValidDate(dateFromMoment)) {
            return dateFromMoment;
        }
    }

    if (typeof date === "string") {
        const dateFromString = moment(date, stringLocale).toDate();

        if (isValidDate(dateFromString)) {
            return dateFromString;
        }
    }

    return null;
}

// TODO: Hook for intl??
export const getLocaleFormattedDate = (date: Date | null | undefined, intl: IntlShape): string => {
    if (date && isValidDate(date)) {
        return intl.formatDate(date, { dateStyle: "medium" });
    }

    return "";
}
