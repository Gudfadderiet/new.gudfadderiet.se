import './css/Form.css'
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { yellow } from '@mui/material/colors';

const theme = createTheme({
    palette: {
      primary: {
        main: yellow[500],
      },
    },
});

function Form() {
  const [questions, setQuestions] = useState([])
  const [textQuestions, setTextQuestions] = useState([])

  function getSelectedOptions() {
    var selected_options = []

    const radio_elem = document.getElementById("Radio-Group").children;
    for(var i = 0; i < radio_elem.length; i++) {
        if(radio_elem[i].children[0].children[0].checked) {
            selected_options.push(radio_elem[i].children[0].children[0].value)
        }
    }

    const checkbox_elem = document.getElementById("Checkbox-Group").children;
    for(var i = 1; i < checkbox_elem.length; i++) {
        if(checkbox_elem[i].children[0].children[0].checked) {
            selected_options.push(checkbox_elem[i].children[0].children[0].labels[0].innerText)
        }
    }

    return selected_options
  }
  
  function createForm() {
    const name_value = document.getElementById("name").value;
    const mail_value = document.getElementById("mail").value;
    const ssn_value = document.getElementById("ssn").value;

    var text_answer_elems = {}
    for(var i = 0; i < textQuestions.length; i++) {
        text_answer_elems[textQuestions[i].content] = document.getElementById("Text-Field-" + i).value
    }

    var point_elems = {}
    var selected_options = getSelectedOptions()
    for(var i = 0; i < selected_options.length; i++) {
        point_elems[i] = selected_options[i]
    }

    const req = {
        "name": name_value,
        "email": mail_value,
        "ssn": ssn_value,
        "answers": JSON.stringify(text_answer_elems),
        "points": JSON.stringify(point_elems)
    }

    fetch("http://127.0.0.1:8000/form/forms/", {
        method: 'POST',
        body: JSON.stringify(req),
        headers: {
          'Content-Type': 'application/json'
        }
    })
    .then(res => console.log(res))
  }

  useEffect(() => {
    fetch('http://127.0.0.1:8000/form/questions/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        console.log(data.results)
        setQuestions(data.results)
    });

    fetch('http://127.0.0.1:8000/form/text_questions/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => {
        setTextQuestions(data.results)
    });
  }, []);

  return (
    <main className="Form-Content">
        <h1>N0lleenkät</h1>
        <ThemeProvider theme={theme}>
            <Box component="form" sx={{ '& > :not(style)': { m: 1, width: '100%' }, }} noValidate autoComplete="off">
                <TextField className="filled-basic" id="name" label='För- och Efternamn' variant="filled" />
                <TextField className="filled-basic" id="mail" label='Epost' variant="filled" />
                <TextField className="filled-basic" id="ssn" label='Personnummer (xxxxxx-xxxx)' variant="filled" />
                {
                    questions.map((question) =>
                    <div className='Question-Wrapper'>
                        {
                            question.multiple_choice ? 
                            <div className='Group-Wrapper'>
                                <FormGroup id="Checkbox-Group">
                                    <FormLabel id="demo-check-buttons-group-label">{question.content}</FormLabel>
                                    {
                                        question.options.map((option) => <FormControlLabel control={<Checkbox defaultChecked />} label={option} />)
                                    }
                                </FormGroup>
                            </div>
                            :
                            <div className='Group-Wrapper'>
                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">{question.content}</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        id="Radio-Group"
                                    >
                                        {
                                            question.options.map((option) => <FormControlLabel value={option} control={<Radio />} label={option} />)
                                        }
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        }
                    </div>
                    )
                }
                {
                    textQuestions.map((textQuestion, i) => 
                    <TextField className="filled-basic" id={"Text-Field-" + i} label={textQuestion.content} variant="filled" />)
                }
                <Button variant="contained" onClick={() => {createForm()}}>Skicka</Button>
            </Box>
        </ThemeProvider>
    </main>
  );
}

export default Form;