import React, { useEffect, useState } from 'react';
import { connect } from "@tableland/sdk";
import { FileUploader } from "react-drag-drop-files";
import { Paper, TextField, Grid, Button, Card, Box, Accordion, AccordionSummary, Typography, AccordionDetails, ImageList, ImageListItem, Link, Stack, Chip } from '@mui/material';
import { IpfsImage } from 'react-ipfs-image';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ethers } from "ethers";
import CaseValidateButton from './CaseValidateButton';
import { useAccount } from 'wagmi';
export interface CaseInputs {
    id: number,
    domain: string,
    isScam: boolean,
    stakeAmount: string,
    evidences: string[],
    comments: string,
    status: string
    validator: boolean
}

const Case = (inputs: CaseInputs) => {
    const {id, domain, isScam, stakeAmount, evidences, comments, status,validator} = inputs;
    const [validatorComments, setValidatorComments] = useState('')
    const { address, isConnected } = useAccount()

    // const evidences: string[] = ['QmeHnVNb8XFggiX3Bs1GjPAZZfQET81bacX5i5KSmGLfSA']

    function getFormatedAmount() {
        return (ethers.utils.formatEther(stakeAmount)).toString()
    }

    return (
        <div>
            <Card sx={{ padding: '20px', marginBottom: '10px', border: '3px solid grey' }}>
            <Grid container >
                {/* <Grid item xs={1.1}>
                    <Typography variant='h3'>#{id}</Typography>
                </Grid> */}
                <Grid item xs={12}>
                    <Typography variant='h6'><b>🌐 Domain:</b> {domain}</Typography>
                    <Stack direction="row" spacing={1} sx={{marginTop: '5px'}}>
                        <Chip label={<span>ID: #{id}</span>} variant="outlined"/>
                        <Chip label={<span><b>Claim:</b> {isScam ? 'Scam ❌' : 'Legit ✅'}</span>} variant="outlined"/>
                        <Chip label={<span><b>Stake:</b> {getFormatedAmount()} MATIC</span>} variant="outlined"/>
                    </Stack>
                </Grid>
                {/* <Grid item xs={3}>
                    <Typography sx={{textAlign: 'right'}}><b>Status:</b> {status===null ? "Open" : status}</Typography>    
                </Grid> */}
            </Grid>
                <Paper sx={{backgroundColor: '#40515c', padding: '10px', color: 'white', margin: '20px 0'}}>
                    <Typography sx={{}}>
                        <b>Case comments:</b> {comments}
                    </Typography>
                </Paper>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        sx={{backgroundColor: 'whitesmoke'}}
                    >
                    <Typography>📜 Case evidences</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <ImageList sx={{ width: '100%' }} cols={3} rowHeight={164}>
                        {evidences.map((item) => (
                            <Link href={item} target="_blank" underline="hover">
                                <ImageListItem key={item}>
                                    <IpfsImage hash={item} gatewayUrl='https://infura-ipfs.io/ipfs'  style={{width:"200px",height:"200px"}}/>
                                </ImageListItem>
                            </Link>
                        ))}
                    </ImageList>
                    </AccordionDetails>
                </Accordion>
                
                {status==null && <div><TextField
                    id="outlined-multiline-static"
                    label="Your Comments"
                    multiline
                    rows={2}
                    defaultValue=""
                    value={validatorComments}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setValidatorComments(event.target.value);
                    }}
                    sx={{width: '100%', marginTop: '10px'}}
                />
                {
                    isConnected ? validator ? <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
                    <CaseValidateButton id={id} validatorComments={validatorComments} action={'ACCEPT'}></CaseValidateButton>
                    <CaseValidateButton id={id} validatorComments={validatorComments} action={'REJECT'}></CaseValidateButton>
                    </Box>
                    :
                    <Typography sx={{marginTop: '10px'}}>You are not a validator</Typography>
                    :
                    <Typography sx={{marginTop: '10px'}}>Please connect your wallet to validate this case</Typography>
                }
                </div>
                }
                
            </Card>
        </div>
    );
}

export default Case;
