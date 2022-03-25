import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { Avatar, Box, Card, Checkbox, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import getInitials from '../../utils/get-initials';

export const CompaniesListResults = ({ companies, ...rest }) => {
    const [selectedCompaniesIds, setSelectedCompaniesIds] = useState([]);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(0);

    const handleSelectAll = (event) => {
        let newSelectedCompaniesIds;

        if (event.target.checked) {
            newSelectedCompaniesIds = companies.map((company) => company.id);
        } else {
            newSelectedCompaniesIds = [];
        }

        setSelectedCompaniesIds(newSelectedCompaniesIds);
    };

    const handleSelectOne = (event, id) => {
        const selectedIndex = selectedCompaniesIds.indexOf(id);
        let newSelectedCompaniesIds = [];

        if (selectedIndex === -1) {
            newSelectedCompaniesIds = newSelectedCompaniesIds.concat(selectedCompaniesIds, id);
        } else if (selectedIndex === 0) {
            newSelectedCompaniesIds = newSelectedCompaniesIds.concat(selectedCompaniesIds.slice(1));
        } else if (selectedIndex === selectedCompaniesIds.length - 1) {
            newSelectedCompaniesIds = newSelectedCompaniesIds.concat(selectedCompaniesIds.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelectedCompaniesIds = newSelectedCompaniesIds.concat(
                selectedCompaniesIds.slice(0, selectedIndex),
                selectedCompaniesIds.slice(selectedIndex + 1)
            );
        }

        setSelectedCompaniesIds(newSelectedCompaniesIds);
    };

    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card {...rest}>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                        checked={selectedCompaniesIds.length === companies.length}
                                        color="primary"
                                        indeterminate={selectedCompaniesIds.length > 0 && selectedCompaniesIds.length < companies.length}
                                        onChange={handleSelectAll}
                                    />
                                </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Company</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Verified</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {companies.slice(0, limit).map((company) => (
                                <TableRow hover key={company.id} selected={selectedCompaniesIds.indexOf(company.id) !== -1}>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedCompaniesIds.indexOf(company.id) !== -1}
                                            onChange={(event) => handleSelectOne(event, company.id)}
                                            value="true"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex'
                                            }}
                                        >
                                            <Avatar sx={{ mr: 2 }}>{getInitials(company.name)}</Avatar>
                                            <Typography color="textPrimary" variant="body1">
                                                {company.name}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{company.company}</TableCell>
                                    <TableCell>{company.role}</TableCell>
                                    <TableCell>{company.status}</TableCell>
                                    <TableCell>{company.verified ? 'Yes' : 'No'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={companies.length}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
};

CompaniesListResults.propTypes = {
    companies: PropTypes.array.isRequired
};
export default CompaniesListResults;
