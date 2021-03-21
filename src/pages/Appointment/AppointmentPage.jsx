import { 
    Paper, 
    Grid, 
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    DialogActions
} from "@material-ui/core";
import {useState} from 'react';
import MUIDataTable from "mui-datatables";
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from "react-redux";
import {pushAppointment,updateAppointment,deleteAppointment} from "../../store/reducers/appointmentSlice";
import Moment from 'react-moment';
const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));


const AppointmentPage = () => {
    
    const classes = useStyles();
    const dispatch = useDispatch();
    const appointmentStore = useSelector(state=>state.appointment);
    const [openCreateAppointmentModal, setOpenCreateAppointmentModal] = useState(false);
    const [openUpdateAppointmentModal, setOpenUpdateAppointmentModal] = useState(false);
    const [openDeleteAppointmentModal, setOpenDeleteAppointmentModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    const [updateAppointmentId, setUpdateAppointmentId] = useState(0);
    const [updateAppointmentDate, setUpdateAppointmentDate] = useState("");
    const [updateAppointmentDescription, setUpdateAppointmentDescription] = useState("");

    const [deleteAppointmentId, setDeleteAppointmentId] = useState(0);

    const [selectedDescription, setSelectedDescription] = useState("");
    const handleOpenCreateAppointmentModal = () => {
        setOpenCreateAppointmentModal(true);
    }
    const handleCloseCreateAppointmentModal = () => {
        setOpenCreateAppointmentModal(false);
    }
    const handleOpenUpdateAppointmentModal = (id) => {
        setUpdateAppointmentId(id);
        var entry = appointmentStore.list[appointmentStore.list.findIndex(x=>x.id === id)];
        setUpdateAppointmentDate(entry.date);
        setUpdateAppointmentDescription(entry.description);
        setOpenUpdateAppointmentModal(true);
    }
    const handleCloseUpdateAppointmentModal = () => {
        setOpenUpdateAppointmentModal(false);
    }
    const handleChangeSelectedDate = (e) => {
        const {value} = e.target;
        setSelectedDate(value);
    }
    const handleChangeSelectedDescription = (e) => {
        const {value} = e.target;
        setSelectedDescription(value);
    }
    const handleChangeUpdateAppointmentDate = (e) => {
        const {value} = e.target;
        setUpdateAppointmentDate(value);
    }
    const handleChangeUpdateAppointmentDescription = (e) => {
        const {value} = e.target;
        setUpdateAppointmentDescription(value);
    }
    const handleCreateAppointment = () =>{
        var randomId = Math.floor(Math.random() * 1000000) + 1;
        dispatch(pushAppointment({id:randomId,date:selectedDate,description: selectedDescription}));
        setSelectedDate("");
        setSelectedDescription("");
        handleCloseCreateAppointmentModal();
    }
    const handleUpdateAppointment = () =>{
        dispatch(updateAppointment({id:updateAppointmentId,date:updateAppointmentDate,description: updateAppointmentDescription}));
        setUpdateAppointmentDate("");
        setUpdateAppointmentDescription("");
        handleCloseUpdateAppointmentModal();
    }
    const handleCloseDeleteAppointmentModal = () => {
        setOpenDeleteAppointmentModal(false);
    }
    const handleOpenDeleteAppointmentModal = (id) => {
        setDeleteAppointmentId(id);
        setOpenDeleteAppointmentModal(true);
    }
    const handleDeleteAppointment = () => {
        dispatch(deleteAppointment({id:updateAppointmentId}));
        setDeleteAppointmentId(0);
        handleCloseDeleteAppointmentModal();
    }
    const columns = [
        {
            name: "date",
            label: "Appointment Date",
            options:{
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <Moment format="DD/MM/YYYY \at HH:mm">{value}</Moment>
                    );
                }
            }
        },
        {
            name: "description",
            label: "Description"
        },
        {
            name: 'id',
            label: 'Update',
            options:{
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button variant="contained" color="primary" onClick={() => handleOpenUpdateAppointmentModal(value)}>
                          Update
                      </Button>
                    );
                }
            }
        },
        {
            name: 'id',
            label: 'Delete',
            options:{
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                      <Button variant="contained" color="secondary" onClick={() => handleOpenDeleteAppointmentModal(value)}>
                          Delete
                      </Button>
                    );
                }
            }
        }
    ]
    const datatableOptions = {
        selectableRows: "none"
    }
    return(
    <>
    <Paper>
        <Grid container>
            <Grid item xs={4}>
                <Button size="large" onClick={handleOpenCreateAppointmentModal} variant='contained' color='primary'>Create Appointment</Button>
            </Grid>
        </Grid>
        <MUIDataTable
        columns={columns}
        data={appointmentStore.list}
        options={datatableOptions}/>
    </Paper>
    {openCreateAppointmentModal &&
     <Dialog open={openCreateAppointmentModal} onClose={handleCloseCreateAppointmentModal} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">Create</DialogTitle>
     <DialogContent>
       <DialogContentText>
         To set appointment, please select a date, enter description and click submit.
       </DialogContentText>
       <TextField
        id="datetime-local"
        label="Select date and time"
        type="datetime-local"
        className={classes.textField}
        value={selectedDate}
        onChange={handleChangeSelectedDate}
        InputLabelProps={{
          shrink: true,
        }}
        />
       <TextField
         autoFocus
         multiline
         variant="outlined"
         margin="dense"
         value={selectedDescription}
         onChange={handleChangeSelectedDescription}
         id="name"
         label="Description"
         rows={4}
         fullWidth
        />
     </DialogContent>
     <DialogActions>
       <Button onClick={handleCloseCreateAppointmentModal} color="primary">
         Cancel
       </Button>
       <Button onClick={handleCreateAppointment} color="primary">
         Submit
       </Button>
     </DialogActions>
    </Dialog>
     
     }
     {openUpdateAppointmentModal &&
     <Dialog open={openUpdateAppointmentModal} onClose={handleCloseUpdateAppointmentModal} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">Update</DialogTitle>
     <DialogContent>
       <DialogContentText>
         To update the appointment, please select a date, enter description and click update.
       </DialogContentText>
       <TextField
        id="datetime-local"
        label="Select date and time"
        type="datetime-local"
        className={classes.textField}
        onChange={handleChangeUpdateAppointmentDate}
        value={updateAppointmentDate}
        //defaultValue={moment(appointmentStore.list[appointmentStore.list.findIndex(x=>x.id == updateAppointmentId)].date).format("YYYY-MM-DDTHH:mm")}
        InputLabelProps={{
          shrink: true,
        }}
        />
       <TextField
         autoFocus
         multiline
         variant="outlined"
         margin="dense"
         defaultValue={updateAppointmentDescription}
         onBlur={handleChangeUpdateAppointmentDescription}
         id="name"
         label="Description"
         rows={4}
         fullWidth
        />
     </DialogContent>
     <DialogActions>
       <Button onClick={handleCloseUpdateAppointmentModal} color="primary">
         Cancel
       </Button>
       <Button onClick={handleUpdateAppointment} color="primary">
         Update
       </Button>
     </DialogActions>
    </Dialog>
     
     }
     {openDeleteAppointmentModal &&
     <Dialog open={openDeleteAppointmentModal} onClose={handleCloseDeleteAppointmentModal} aria-labelledby="form-dialog-title">
     <DialogTitle id="form-dialog-title">Delete</DialogTitle>
     <DialogContent>
       <DialogContentText>
         Do you want to delete the appointment on <Moment format="DD/MM/YYYY \at HH:mm">{appointmentStore.list[appointmentStore.list.findIndex(x=>x.id === deleteAppointmentId)].date}</Moment>?
       </DialogContentText>
     </DialogContent>
     <DialogActions>
       <Button onClick={handleCloseDeleteAppointmentModal} color="primary">
         Cancel
       </Button>
       <Button onClick={handleDeleteAppointment} color="secondary">
         Delete
       </Button>
     </DialogActions>
    </Dialog>
     
     }
    </>)
}
export default AppointmentPage;