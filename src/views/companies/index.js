// material-ui
import { Box, Container } from '@mui/material';
import { CompaniesListToolbar } from './companies-list-toolbar';
import CompaniesListResults from './companies-list-result';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
// project imports
import MainCard from 'ui-component/cards/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        fetch('https://demo1779595.mockable.io/companies', { method: 'POST' })
            .then((res) => res.json())
            .then((data) => setCompanies(data.companiesList.map((info) => ({ ...info, id: uuid() }))));
    }, []);
    console.log(companies);
    return (
        <MainCard>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <CompaniesListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <CompaniesListResults companies={companies} />
                    </Box>
                </Container>
            </Box>
        </MainCard>
    );
};

export default Companies;
