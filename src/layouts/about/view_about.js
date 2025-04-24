

import { Button, Dialog, DialogActions, DialogTitle, DialogContent, List, ListItem, ListItemText } from "@mui/material";
import MDTypography from "components/MDTypography";
import PropTypes from "prop-types";

const View_about = ({ open, handleClose, data }) => {

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle sx={{ fontSize: "16px", fontWeight: 500, padding: "12px 24px" }}>
                Description
            </DialogTitle>

            <MDTypography sx={{ fontSize: "12px", padding: "12px 24px" }}>
                {data}
            </MDTypography>
            <DialogActions>
                <Button onClick={handleClose} color="primary" >
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

View_about.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
};

export default View_about;
