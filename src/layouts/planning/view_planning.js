

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, List, ListItem, ListItemText } from "@mui/material";
import PropTypes from "prop-types";

const View_Planning = ({ open, handleClose, data }) => {
    const planningData = data;

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontSize: "16px", fontWeight: 500, padding: "12px 24px" }}>
                Planning Tasks
            </DialogTitle>
            <DialogContent>
                <List>
                    {
                        planningData?.length ? (
                            planningData?.map((task, index) => (
                                <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                                    <ListItemText
                                        primary={`${index + 1}. ${task}`}
                                        primaryTypographyProps={{ fontSize: "12px", color: "gray" }}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem sx={{ borderBottom: "1px solid #ddd" }}>
                                <ListItemText
                                    primary={`No Task Added`}
                                    primaryTypographyProps={{ fontSize: "12px", color: "gray" }}
                                />
                            </ListItem>
                        )
                    }

                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

View_Planning.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
};

export default View_Planning;
