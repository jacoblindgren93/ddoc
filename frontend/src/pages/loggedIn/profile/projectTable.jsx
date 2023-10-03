import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    useTheme,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useContext } from "react";
import { Projects } from "./profile";

export default function ProjectTable({ headers, onDeleteRow }) {
    const { projects } = useContext(Projects);
    const theme = useTheme();
    const tableCellStyle = {
        fontWeight: 500,
        cursor: "pointer",
        transition: "0.2s",
    };

    return (
        <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {headers.map((data) => {
                            return (
                                <TableCell
                                    key={data}
                                    align="left"
                                    sx={{ fontWeight: "bold" }}
                                >
                                    {data}
                                </TableCell>
                            );
                        })}
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projects.map((row, index) => (
                        <TableRow
                            key={row.name}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                                ...(index % 2 === 1 && {
                                    backgroundColor:
                                        theme.palette.background.tableOddRow,
                                }),
                                color: theme.palette.text.secondary,
                                borderRadius: "10px",

                                transition: "0.1s",
                                "&:hover": {
                                    backgroundColor:
                                        theme.palette.background.paper,
                                    color: "red",
                                },
                            }}
                        >
                            <TableCell sx={tableCellStyle} align="left">
                                {row.name}
                            </TableCell>
                            <TableCell sx={tableCellStyle} align="left">
                                {row.author}
                            </TableCell>
                            <TableCell sx={tableCellStyle} align="left">
                                {row.created}
                            </TableCell>
                            <TableCell sx={tableCellStyle} align="left">
                                {row.tickets}
                            </TableCell>
                            <TableCell>
                                <DeleteIcon
                                    sx={tableCellStyle}
                                    onClick={() =>
                                        onDeleteRow(row.id, row.name)
                                    }
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
