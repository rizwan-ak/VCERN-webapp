import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import VCERNTypography from "../common/elements/VCERNTypography";
import VCERNButton from "../common/elements/VCERNButton";

import { connect } from "react-redux";
import icons from "../common/icons";
import DashboardHeader from "../common/DashboardHeader";
import constants from "../common/constants";
import AC from "../redux/actions/actionCreater";
import { getFormattedDate } from "../common/helper";
import DocumentsList from "../common/DocumentsList";
import { useLocation } from "react-router-dom";
import VCERNModal from "../common/elements/VCERNModal";
import API from "../common/api";
import VCERNAlert from "../common/elements/VCERNAlert";
import VCERNTextField from "../common/elements/VCERNTextField";

const useStyles = makeStyles((theme) => ({
  input: { margin: "10px 0" },
  title: { margin: "15px 0", fontWeight: "bold" },
  boldText: { fontWeight: "500" },
  main: { margin: "20px 0", width: "100%" },
  inline: { margin: "10px 0 10px 10px", display: "flex" },
  icon: { marginRight: 15 },
  docImage: { width: 125, height: 112.7 },
  sendMessage: {
    marginRight: 10,
    [theme.breakpoints.down("md")]: { marginBottom: 20 },
  },
  buttonsHolder: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
  },
}));

function Profile({
  currentUser,
  type,
  setCurrentPageTitle,
  fetchDocs,
  token,
  triggerNotification,
}) {
  const classes = useStyles();
  const location = useLocation();

  const [state, setstate] = useState({});
  const [docs, setDocs] = useState([]);
  const [messageModal, setMessageModal] = useState(false);
  const [notificationModal, setNotificationModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    setCurrentPageTitle(`Member Profile`);
    type === constants.USER_TYPE_MEMBER
      ? setstate(currentUser)
      : setstate(location.state.member);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    state?._id && fetchDocs(state?._id, token, setDocs);

    // eslint-disable-next-line
  }, [state]);

  const tagline = `${state?.address?.city}, ${state?.address?.state}`;
  const name = `${state?.first_name} ${state?.last_name}`;
  const phone = state?.phone;
  const email = state?.email;
  const address = `${state?.address?.apt ? state?.address?.apt + ", " : ""}${
    state?.address?.street_address
  }, ${state?.address?.city}, ${state?.address?.state}`.trim();
  const bName = `${state?.beneficiary?.first_name} ${state?.beneficiary?.last_name}`;
  const bDob = state?.beneficiary?.dob;
  const bPhone = state?.beneficiary?.phone;
  const bAddress = `${
    state?.beneficiary?.address?.apt
      ? state?.beneficiary?.address?.apt + ", "
      : ""
  }${state?.beneficiary?.address?.street_address}, ${
    state?.beneficiary?.address?.city
  }, ${state?.beneficiary?.address?.state}`.trim();
  const onSendNotification = async () => {
    await triggerNotification(
      { description: message, title: "Announcement", members: [state._id] },
      token,
      () => {
        setSuccessMessage("Notification Sent Successfully.");
      }
    );
    setMessage("");
    setNotificationModal(false);
  };
  return (
    <Grid container>
      <DashboardHeader title={name} subTitle={tagline} id={state?._id} />
      <div className={classes.main}>
        <div className={classes.buttonsHolder}>
          <VCERNButton
            startIcon={icons.notification}
            value="Send a Notification"
            align="left"
            onClick={() => setNotificationModal(true)}
          />
        </div>
        <div>
          <VCERNTypography
            className={classes.title}
            variant="h6"
            value="Personal Info"
          />
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.phone}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={phone}
            />
          </div>
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.email}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={email}
            />
          </div>
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.state}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={address}
            />
          </div>
        </div>

        <div>
          <VCERNTypography
            className={classes.title}
            variant="h6"
            value="Beneficiary Info"
          />
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.profile}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={bName}
            />
          </div>
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.date}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={getFormattedDate(bDob)}
            />
          </div>
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.phone}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={bPhone}
            />
          </div>
          <div className={classes.inline}>
            <div className={classes.icon}>{icons.state}</div>
            <VCERNTypography
              className={classes.boldText}
              variant="body1"
              value={bAddress}
            />
          </div>

          {state?.beneficiary?.email && (
            <VCERNButton
              target="_blank"
              href={`mailto:${state?.beneficiary?.email}`}
              startIcon={icons.email}
              value="Contact Beneficiary"
              align="left"
            />
          )}
          {/* <a href={state?.beneficiary?.email} target="_blank" rel="noreferrer">
                            Contact Beneficiary
                        </a> */}
        </div>

        <div>
          <VCERNTypography
            className={classes.title}
            variant="h6"
            value="Documents"
          />
          <DocumentsList docs={docs} />
        </div>
      </div>
      <VCERNModal
        title="Send a Notification"
        buttonTittle="Submit"
        open={notificationModal}
        onClose={() => setNotificationModal(false)}
        onConfirm={onSendNotification}
      >
        <VCERNTextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter the message for the notification"
        />
      </VCERNModal>
      <VCERNAlert
        message={successMessage}
        onClose={() => setSuccessMessage(false)}
        success={true}
      />
    </Grid>
  );
}
export default connect((data) => data, {
  setCurrentPageTitle: AC.setCurrentPageTitle,
  fetchDocs: AC.fetchDocs,
  triggerNotification: AC.triggerNotification,
})(Profile);
