import React from "react";
import _ from "lodash";
import TopbarGuest from "./topbar_guest";
import TopbarUser from "./topbar_user";

export default function Topbar(props) {
    if (_.isEmpty(props.account)) {
        return <TopbarGuest />;
    } else {
        return <TopbarUser KH_name={props.account.name} />;
    }
}
