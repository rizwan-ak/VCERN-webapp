import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import VCERNButton from "../common/elements/VCERNButton";
import VCERNTypography from "../common/elements/VCERNTypography";
import icons, { Attach, BackArrow, Send, Add } from "../common/icons";

import { connect } from "react-redux";
import VCERNTextField from "../common/elements/VCERNTextField";
import VCERNAvatar from "../common/elements/VCERNAvatar";
import VCERNModal from "../common/elements/VCERNModal";

import cx from "clsx";

import {
  sendMessage,
  join,
  onJoin,
  onRoomJoin,
  onChatsUpdate,
  onMessageRecieved,
  disconnectSocket,
  joinRoom,
  endTicket,
  onTicketEnded,
  createTicket,
  onTicketCreated,
  onMessageSeen,
  leaveRoom,
} from "../common/socketChat";

import { getDateTime, timeDiffFromNow } from "../common/helper";
import AC from "../redux/actions/actionCreater";
import FileMessage from "../common/FileMessage";
import constants from "../common/constants";
import { getRoles } from "../common/data";

const useStyles = makeStyles((theme) => ({
  mainBox: { height: "80vh" },

  chatListBox: { border: "1px solid #BFC1D6", height: "calc(80vh - 50px)" },
  newChatBox: {
    background: "#0191DA",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "white",
    height: "60px",
    padding: 20,
  },
  boldText: { fontWeight: "bold" },
  input: { height: "50px" },
  newTicketInput: { margin: "10px 0" },

  chatLists: { overflowY: "auto", height: "calc(80vh - 110px)" },
  chatBox: {
    background: "none",
    padding: 10,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  activeChatBox: {
    background: "#ECEFF9",
    padding: 10,
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  inline: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  displayPicture: { marginRight: 15, height: 50, width: 50 },
  otherDisplayPicture: { marginLeft: 15, height: 50, width: 50 },
  displayPictureToOpen: {
    marginRight: 15,
    height: 50,
    width: 50,
    cursor: "pointer",
  },
  clipedText: {
    whiteSpace: "nowrap",
    width: 180,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  backIcon: {
    display: "none",
    [theme.breakpoints.down("sm")]: { display: "block" },
  },

  newChatIcon: { cursor: "pointer" },

  conversationBox: { border: "1px solid #BFC1D6", height: "80vh" },
  infoBox: {
    padding: 15,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #BFC1D6",
    height: 80,
  },
  messages: { overflowY: "auto", height: "calc(80vh - 300px)" },

  ticketInfo: {
    padding: 15,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1px solid #BFC1D6",
    height: 160,
  },

  myMessageBox: {
    padding: "10px 20px",
    display: "flex",
    alignItems: "flex-end",
  },
  myMessageText: {
    background: "#ECEFF9",
    maxWidth: 400,
    borderRadius: "15px 15px 15px 0px",
    padding: 10,
  },
  otherMessageBox: {
    padding: "10px 20px",
    display: "flex",
    flexDirection: "row-reverse",
    alignItems: "flex-end",
  },
  otherMessageText: {
    background: "#0191DA",
    maxWidth: 400,
    borderRadius: "15px 15px 0px 15px",
    padding: 10,
    color: "white",
  },

  newMessageBox: {
    height: 50,
    border: "1px solid #BFC1D6",
    marginBottom: 10,
    borderRadius: 25,
    paddingLeft: 20,
    display: "flex",
    alignItems: "center",
    margin: "0 20px",
  },
  attachIcon: {
    cursor: "pointer",
    margin: "0 10px",
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("sm")]: { margin: "0 5px" },
  },
  send: {
    background: "#0191DA",
    height: 50,
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    borderRadius: 25,
    cursor: "pointer",
  },
  sendInput: { border: "none", outline: "none", flexGrow: 1, minWidth: 40 },

  hideOnSm: { [theme.breakpoints.down("sm")]: { display: "none" } },
  unreadBadge: {
    height: 10,
    width: 10,
    background: "#FE9900",
    borderRadius: 50,
  },
}));

function Tickets({
  currentUser,
  type,
  getPreSignedLink,
  uploadFile,
  setCurrentPageTitle,
}) {
  const classes = useStyles();

  const { _id, organization } = currentUser;

  const [showList, setShowList] = useState(true);
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [currentChatIdx, setCurrentChatIdx] = useState(0);
  const [currentChat, setCurrentChat] = useState([]);
  const [allChats, setAllChats] = useState([]);
  const [filteredChats, setFilteredChats] = useState([]);
  const [state, setState] = useState({
    message: "",
    search: "",
    subject: "",
    newTicket: "",
  });

  const { message, search, subject, newTicket } = state;
  useEffect(() => {
    setCurrentPageTitle(`${getRoles[type]} Tickets`);

    join(
      type === constants.USER_TYPE_VCERN ? "vcern_admin" : type,
      _id,
      organization
    );
    onJoin(
      (val) => setAllChats(val),
      (val) => setFilteredChats(val),
      (val) => setCurrentChatIdx(val),
      true
    );
    onChatsUpdate((val) => {
      setAllChats((prevChat) =>
        prevChat.map((e) =>
          e._id === val.ticket._id
            ? {
                ...e,
                last_message: val.ticket.last_message,
                messages: [...e.messages, val.ticket.last_message],
                seen: val.ticket.seen,
              }
            : e
        )
      );
      setFilteredChats((prevChat) =>
        prevChat.map((e) =>
          e._id === val.ticket._id
            ? {
                ...e,
                last_message: val.ticket.last_message,
                messages: [...e.messages, val.ticket.last_message],
                seen: val.ticket.seen,
              }
            : e
        )
      );
    });
    onRoomJoin();
    onMessageSeen((val) => {
      setAllChats((prevChat) =>
        prevChat.map((e) =>
          e._id === val.ticket._id ? { ...e, seen: val.ticket.seen } : e
        )
      );
      setFilteredChats((prevChat) =>
        prevChat.map((e) =>
          e._id === val.ticket._id ? { ...e, seen: val.ticket.seen } : e
        )
      );
    });
    joinRoom(currentChat?._id);
    onMessageRecieved((val) =>
      setCurrentChat((prevChat) => ({
        ...prevChat,
        messages: [...prevChat.messages, val],
      }))
    );
    onTicketEnded((val) => {
      console.log({
        val,
      });
      setCurrentChat(val);
      setFilteredChats((prevTickets) =>
        prevTickets.map((e) =>
          e._id === val._id ? { ...e, open: false, ...val } : e
        )
      );
      setAllChats((prevTickets) =>
        prevTickets.map((e) =>
          e._id === val._id ? { ...e, open: false, ...val } : e
        )
      );
    });
    onTicketCreated(
      (val) => setAllChats((prevTickets) => [...prevTickets, val]),
      (val) => setFilteredChats((prevTickets) => [...prevTickets, val]),
      (val) => {}
    );
    return () => disconnectSocket();

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const messages = document.getElementById("messages");
    messages.scrollTop = messages.scrollHeight;
  }, [currentChat?.messages?.length]);

  useEffect(() => {
    setFilteredChats(
      allChats.filter((el) =>
        el.name.toLowerCase().includes(search.toLowerCase())
      )
    );

    // eslint-disable-next-line
  }, [search.length]);

  useEffect(() => {
    setCurrentChat(filteredChats.find((el) => el._id === currentChatIdx));

    // eslint-disable-next-line
  }, [currentChatIdx]);

  const handleOnChange = (evt) => {
    const { name, value } = evt.target;
    setState({ ...state, [name]: value });
  };

  const handleSend = (message, files = []) => {
    sendMessage(message, files, currentChat?._id, "ticket");
    setState({ ...state, message: "" });
  };

  const handleAttachment = (evt) => {
    const files = [...evt.target.files];
    files.map((el) => {
      const { name, type } = el;
      return getPreSignedLink({ name, type }, (url) =>
        uploadFile({ url, file: el, type }, () =>
          handleSend("File Attached", [
            { url: url.split("?")[0], fileType: type },
          ])
        )
      );
    });
  };

  const handleToggleChat = (idx) => {
    setShowList(false);
    leaveRoom(currentChatIdx);
    joinRoom(idx);
    setCurrentChatIdx(idx);
  };

  const handleCloseTicket = () => {
    endTicket(currentChat._id);
  };

  const handleCreateNewTicket = () => {
    setShowNewTicketModal(false);
    createTicket(subject, organization, newTicket);
    setState({ ...state, newTicket: "", subject: "" });
  };

  return (
    <Grid container className={classes.mainBox}>
      <Grid item xs={12} md={3} className={!showList && classes.hideOnSm}>
        <div className={classes.input}>
          <VCERNTextField
            label="Search"
            icon={icons.search}
            value={search}
            name="search"
            onChange={handleOnChange}
          />
        </div>
        <div className={classes.chatListBox}>
          <div className={classes.newChatBox}>
            <VCERNTypography
              variant="body1"
              value="Tickets"
              className={classes.boldText}
            />
            {type === constants.USER_TYPE_ORG && (
              <Add
                className={classes.newChatIcon}
                onClick={() => setShowNewTicketModal(true)}
              />
            )}
          </div>
          <div className={classes.chatLists}>
            {filteredChats.map((el) => (
              <div
                key={el._id}
                className={
                  el._id === currentChatIdx
                    ? classes.activeChatBox
                    : classes.chatBox
                }
                onClick={() => handleToggleChat(el._id)}
              >
                <VCERNAvatar
                  src={el.image}
                  className={classes.displayPicture}
                />
                <div style={{ flexGrow: 1, flexDirection: "column" }}>
                  <div className={classes.inline}>
                    <VCERNTypography
                      variant="body1"
                      value={el.name}
                      className={classes.boldText}
                    />
                    {!el.seen && <div className={classes.unreadBadge} />}
                  </div>
                  <div className={classes.inline}>
                    <div className={classes.clipedText}>
                      {el.organization_name || "Organization Name"}
                    </div>
                    <VCERNTypography
                      variant="body2"
                      value={timeDiffFromNow(el.last_message.timestamp)}
                      customColor="#657285"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Grid>
      <Grid item xs={12} md={9}>
        <div
          className={cx(classes.conversationBox, {
            [classes.hideOnSm]: showList,
          })}
        >
          <div className={classes.infoBox}>
            <BackArrow
              onClick={() => setShowList(true)}
              className={classes.backIcon}
            />
            <VCERNAvatar
              src={currentChat?.image}
              className={classes.displayPictureToOpen}
            />
            <VCERNTypography
              variant="body1"
              value={currentChat?.organization_name}
              className={classes.boldText}
            />
          </div>
          <div className={classes.ticketInfo}>
            <VCERNTypography
              variant="h6"
              value={currentChat?.subject}
              className={classes.boldText}
            />
            {currentChat && (
              <>
                <VCERNTypography
                  variant="body1"
                  value={`Ticket Number #${currentChat?.number}`}
                  className={classes.boldText}
                />
                <VCERNTypography variant="body1" className={classes.boldText}>
                  Status:{" "}
                  <VCERNTypography
                    variant="body1"
                    value={currentChat?.open ? "Open" : "Closed"}
                    component="span"
                    className={classes.boldText}
                    customColor={currentChat?.open ? "#089156" : "#CE2E2E"}
                  />
                </VCERNTypography>
                {currentChat?.open ? (
                  <VCERNButton
                    value="Close Ticket"
                    background="#CE2E2E"
                    rounded
                    onClick={handleCloseTicket}
                  />
                ) : (
                  <VCERNTypography variant="body1" className={classes.boldText}>
                    Closed By:{" "}
                    <VCERNTypography
                      variant="body1"
                      value={currentChat?.closed_by}
                      component="span"
                      className={classes.boldText}
                    />
                  </VCERNTypography>
                )}
              </>
            )}
          </div>
          <div
            className={classes.messages}
            id="messages"
            style={{
              height: !currentChat?.open
                ? "calc(80vh - 250px)"
                : "calc(80vh - 300px)",
            }}
          >
            {currentChat?.messages?.map((el, idx) => (
              <div key={idx}>
                {(
                  type === constants.USER_TYPE_ORG
                    ? el.from.message_type === constants.USER_TYPE_ORG
                    : el.from.message_type === "vcern_admin"
                ) ? (
                  <div className={classes.myMessageBox}>
                    <VCERNAvatar
                      src={el.from.image}
                      className={classes.displayPicture}
                    />
                    {!el.files.length ? (
                      <div className={classes.myMessageText}>
                        {el.message}
                        <br />
                        <VCERNTypography
                          variant="caption"
                          value={getDateTime(el.timestamp)}
                          customColor="#657285"
                        />
                      </div>
                    ) : (
                      <FileMessage
                        className={classes.myMessageText}
                        message={el}
                      >
                        <VCERNTypography
                          variant="caption"
                          value={getDateTime(el.timestamp)}
                          customColor="#657285"
                        />
                      </FileMessage>
                    )}
                  </div>
                ) : (
                  <div className={classes.otherMessageBox}>
                    <VCERNAvatar
                      src={el.from.image}
                      className={classes.otherDisplayPicture}
                    />
                    {!el.files.length ? (
                      <div className={classes.otherMessageText}>
                        {el.message}
                        <br />
                        <VCERNTypography
                          variant="caption"
                          value={getDateTime(el.timestamp)}
                        />
                      </div>
                    ) : (
                      <FileMessage
                        className={classes.otherMessageText}
                        message={el}
                      >
                        <VCERNTypography
                          variant="caption"
                          value={getDateTime(el.timestamp)}
                        />
                      </FileMessage>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {currentChat?.open && (
            <div className={classes.newMessageBox}>
              <input
                className={classes.sendInput}
                placeholder="Type your message here......."
                value={message}
                name="message"
                onChange={handleOnChange}
              />
              <label htmlFor="upload-photo" className={classes.attachIcon}>
                <Attach />
              </label>
              <input
                id="upload-photo"
                type="file"
                style={{ display: "none" }}
                onChange={handleAttachment}
                multiple
              />
              <div onClick={() => handleSend(message)} className={classes.send}>
                <Send />
              </div>
            </div>
          )}
        </div>
      </Grid>

      <VCERNModal
        title="Submit a New Ticket"
        open={showNewTicketModal}
        onClose={() => setShowNewTicketModal(false)}
        onConfirm={handleCreateNewTicket}
        buttonTittle="Generate Ticket"
      >
        <VCERNTextField
          placeholder="Subject"
          value={subject}
          name="subject"
          onChange={handleOnChange}
          className={classes.newTicketInput}
        />
        <VCERNTextField
          multiline
          rows={5}
          placeholder="Body"
          value={newTicket}
          name="newTicket"
          onChange={handleOnChange}
          className={classes.newTicketInput}
        />
      </VCERNModal>
    </Grid>
  );
}
export default connect((state) => state, {
  getPreSignedLink: AC.getPreSignedLink,
  uploadFile: AC.uploadFile,
  setCurrentPageTitle: AC.setCurrentPageTitle,
})(Tickets);
