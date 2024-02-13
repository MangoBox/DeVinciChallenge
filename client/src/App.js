import * as React from 'react';
import logo from "./images/Logo_esilv_png_blanc.png";
import "./App.css";

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
//import '@mui/icons-material';
import Container from '@mui/material/Container';
//import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Done from '@mui/icons-material/Done'
import QuestionMark from '@mui/icons-material/QuestionMark'
import Divider from '@mui/material/Divider'

function formatTime(delta) {
  var deltaSecs = delta / 1000;
  if(deltaSecs > 3600) {
    return (deltaSecs/3600).toFixed(1) + ' hours ago';
  } else if(deltaSecs > 60) {
    return (deltaSecs/60).toFixed(1) + ' minutes ago';
  } else {
    return deltaSecs.toFixed(1) + ' seconds ago';
  }
}

function App() {
  const [teams, setTeam] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((teams) => setTeam(teams));
  }, []);

  //var teams2 = Array.from({ length: 10 }, () => Array(10).fill(0));
  //teams2[0][0] = 1707818001000;
  //console.log(teams2);
  //teams2[0][0] = 1;
  //var teams = Array.from({ length: 10 }, () => Array(10).fill(0));
  //teams[0][0] = 1707818001000;

  var teamThemes = [
    'Paris des ingénieurs',
    'Paris Fashion',
    'Paris des jardins',
    'Paris-RiveDroite Foodies',
    'Paris des peintres',
    'Paris-RiveGauche Foodies',
    'Paris des écrivains',
    'Paris Historique',
    'Paris des sculpteurs',
    'Paris des musées'
  ];

  const timestamp = Date.now();
  


  var teamAccordions = !teams ? "Loading..." : teams.map((team, index) =>
    <Box>



    <Accordion>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
        sx={{
          backgroundColor: "#ffedf0"
        }}
      >
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
        <Box ><Typography variant='h4'>Team {index + 1}</Typography></Box>
       
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box sx={{justifyContent: 'flex-end' }}><Typography variant='h5' color='#c72240'>Found {
          team.filter(found => (found !== undefined && found !== 0)).length
          }/10</Typography></Box>
          </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
         <Typography variant='h5' fontWeight='bold'>Transmitters Found</Typography>
          <Stack spacing={2}>
            {team.map((item, index) => {
              if(item !== undefined && item !== 0) {
                  return(
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                     <Typography variant='h6'>{teamThemes[index]} (Team {index+1})</Typography><Chip icon={<Done/>}color="success" label={'Found ' + formatTime(timestamp - item) + '!'}/>
                    </Stack>
                  );
                } else {
                  return(
                    <Stack
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="center"
                      spacing={2}
                    >
                      <Typography variant='h6'>{teamThemes[index]} (Team {index+1})</Typography><Chip icon={<QuestionMark/>} label={'Not found yet...'}/>
                    </Stack>
                  );
                }
              //const rows = [];
              /*for(let i = 0; i < 10; i++) {
                if(item[i] !== undefined && item[i] !== 0) {
                  rows.push(<Chip label={item}/>);
                } else {
                  rows.push(<Chip label='Not Found!'/>);
                }
              }*/
              //return rows;
            })}
          </Stack>
          
        </Typography>
        
      </AccordionDetails>
    </Accordion>
    <Box sx={{ m: 2 }} /> 
    </Box>
    
  );


  /*return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data} hello</p>
      </header>
    </div>
  );*/

  return (
  <Stack>
    <img style={{display:'flex', alignSelf: 'center'}} src={logo} width={150} height={150}/>
    <Container maxWidth="md">
      {teamAccordions}
    </Container>
    
  </Stack>
  
  );

}

export default App;