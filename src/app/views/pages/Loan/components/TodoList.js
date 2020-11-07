import React, { Component } from 'react'
import {Radio, FormControl, FormControlLabel, RadioGroup, FormLabel} from "@material-ui/core";

class TodoList extends Component {
    render() {
        return (
            <div>
                <div className="pb-5 pt-7 px-8 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderRadius:10, width:"auto"}} >
                <FormControl component="fieldset">
                    <FormLabel component="legend">To Do List</FormLabel>
                    <RadioGroup
                    aria-label="position"
                    name="position"
                    column>
                    <FormControlLabel
                        value="end"
                        control={<Radio color="primary" />}
                        label="Search for SESIS as your Guarantor to apply for loan"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="end"
                        control={<Radio color="primary" />}
                        label="You can also create a group with SESIS member to apply for Loan"
                        labelPlacement="end"
                        />
                    </RadioGroup>
                </FormControl>
                </div>
            </div>
        )
    }
}

export default TodoList
