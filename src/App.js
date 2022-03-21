import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import NavBar from './components/NavBar'
import Grid from './components/Grid'
import Footer from './components/Footer'
import CustomBtn from './components/CustomBtn'
import { ThemeProvider } from "@mui/material/styles";
import './App.css';
//changes to imports 
import SecurityIcon from '@material-ui/icons/Security';
import EventNoteIcon from '@material-ui/icons/EventNote';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import ComputerIcon from '@material-ui/icons/Computer';
import HttpIcon from '@material-ui/icons/Http';


const theme = createTheme({
    palette: {
        primary: {
            main: "#2e1667",
        },
        secondary: {
            main: "#c7d8ed",
        },
    },
    typography: {
        fontFamily: [
            'Roboto'
        ],
        h4: {
            fontWeight: 600,
            fontSize: 28,
            lineHeight: '2rem',
        },
        h5: {
            fontWeight: 100,
            lineHeight: '2rem',
        },
    },
})

const styles = makeStyles({
    wrapper: {
        width: "65%",
        margin: "auto",
        textAlign: "center"
    },
    bigSpace: {
        marginTop: "5rem"
    },
    littleSpace: {
        marginTop: "2.5rem",
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
})



function App() {
    const classes = styles(); <
    TableContainer component = { Paper } >
        <
        Table sx = {
            { minWidth: 650 }
        }
    aria - label = "simple table" >
        <
        TableHead >
        <
        TableRow >
        <
        TableCell > Dessert(100 g serving) < /TableCell> <
    TableCell align = "right" > Calories < /TableCell> <
    TableCell align = "right" > Fat < /TableCell> <
    TableCell align = "right" > Carbs < /TableCell> <
    TableCell align = "right" > Protein < /TableCell> < /
    TableRow > <
        /TableHead> <
    TableBody > {
            rows.map((row) => ( <
                TableRow key = { row.name }
                sx = {
                    { '&:last-child td, &:last-child th': { border: 0 } }
                } >
                <
                TableCell component = "th"
                scope = "row" > { row.name } <
                /TableCell> <
                TableCell align = "right" > { row.calories } < /TableCell> <
                TableCell align = "right" > { row.fat } < /TableCell> <
                TableCell align = "right" > { row.carbs } < /TableCell> <
                TableCell align = "right" > { row.protein } < /TableCell> < /
                TableRow >
            ))
        } <
        /TableBody> < /
    Table > <
        /TableContainer>;




    return ( < DataGrid rows = { rows }
        columns = { columns }
        pageSize = { 5 }
        rowsPerPageOptions = {
            [5]
        }
        checkboxSelection /
        >
    );
}

export default App;