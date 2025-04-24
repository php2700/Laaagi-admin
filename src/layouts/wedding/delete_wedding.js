import { Button, Dialog, DialogActions, DialogTitle } from '@mui/material';
import axios from 'axios';
import PropTypes from "prop-types";


const Delete_wedding = ({ open, handleClose, data, id }) => {
    const token = localStorage.getItem("authToken");
    const handleDelete = () => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}api/admin/delete_wedding/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            data();
            handleClose();
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{
                fontSize: '14px',
                fontWeight: 300,
                padding: '12px 24px',
            }}>Are you sure to Delete?</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    No
                </Button>
                <Button onClick={handleDelete} color="error" autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    );


};

Delete_wedding.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    data: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired
};

export default Delete_wedding; 