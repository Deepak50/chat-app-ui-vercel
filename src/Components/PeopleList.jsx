import { Avatar, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";

function PeopleList(props) {
    const chatList = props.chatList;
    return (
        chatList.map(chat => <ListItem button key="RemySharp">
        <ListItemIcon>
            <Avatar alt="Remy Sharp" src={chat.image} />
        </ListItemIcon>
        <ListItemText>{chat.name}</ListItemText>
        <ListItemText secondary={chatList[0].status} align="right"></ListItemText>
    </ListItem>)
    )
}
export default PeopleList;