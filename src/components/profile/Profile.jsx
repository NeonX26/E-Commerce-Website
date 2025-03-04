import { Box, FormControl, FormControlLabel, FormLabel, Grid2, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar';
import Context from '../../context/Context';

const Profile = () => {
    const Navigate = useNavigate();
    const {user} = useContext(Context)
    console.log(user)
    return (
        <>
            <Navbar />
            <Box sx={{ display: 'flex', alignItems: 'center', mt: { xs: 4, md: 8 }, pl: { xs: 2, md: 10 }, width: '100%' }}>
                <Typography variant="body1" onClick={() => Navigate('/')} sx={{ cursor: 'pointer', fontSize: { xs: 12, md: 15 } }}>HOME /</Typography>
                <Typography variant="body1" sx={{ cursor: 'pointer', fontSize: { xs: 12, md: 15 } }}>MY ACCOUNT</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center', minHeight: '60vh', backgroundColor: '#f4f4f4', width: '100%', margin: 'auto', mt: 2 }}>
                <Grid2 sx={{ backgroundColor: 'White', width: '20%', height: '100%', my: 2, mx: 1, p: 3, borderRadius: '5px' }}>
                    <Box >
                        <Typography variant='h6'>Hello, {user.userInfo.name}</Typography>
                    </Box>

                </Grid2>
                <Grid2 sx={{ backgroundColor: 'white', width: '40%', height: '100%', my: 2, mx: 1, p: 3, borderRadius: '5px' }}>
                    <Typography variant='h6'>Personal Information</Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', pb: 2 }} >

                        <TextField
                            id="standard-read-only-input"
                            label="First Name"
                            defaultValue={user.userInfo.name}
                            variant="standard"

                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            sx={{ m: 1, width: '45%' }}
                        />
                        <TextField
                            id="standard-read-only-input"
                            label="Last Name"
                            defaultValue=''
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            sx={{ m: 1, width: '45%' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', pb: 2 }} >

                        <TextField
                            id="standard-read-only-input"
                            label="Email"
                            defaultValue={user.userInfo.email}
                            variant="standard"

                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            sx={{ m: 1, width: '45%' }}
                        />
                        <TextField
                            id="standard-read-only-input"
                            label="Mobile No."
                            defaultValue=''
                            variant="standard"
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            sx={{ m: 1, width: '45%' }}
                        />
                    </Box>
                    {/* <FormControl>
                        <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
                        <RadioGroup
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="row-radio-buttons-group"
                        >
                            <FormControlLabel value="female" control={<Radio />} label="Female" />
                            <FormControlLabel value="male" control={<Radio />} label="Male" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                        </RadioGroup>
                    </FormControl> */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', flexWrap: 'wrap', pb: 2 }} >

                        <TextField
                            id="standard-read-only-input"
                            label="Address"
                            defaultValue={user.userInfo.address}
                            variant="standard"
                            fullWidth
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                            sx={{ m: 1,  }}
                        />
                    </Box>
                </Grid2>
            </Box>

        </>
    )
}

export default Profile