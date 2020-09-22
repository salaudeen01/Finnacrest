import React, { Component } from 'react'
import {Radio, FormControl, FormControlLabel, RadioGroup, FormLabel} from "@material-ui/core";

class TodoList extends Component {
    render() {
        return (
            <div>
                <div className="pb-5 pt-7 px-8 bg-default" style={{border:1, borderStyle:"solid", borderColor:"#04956a", borderBottomRightRadius:20, borderTopLeftRadius:20, width:"auto"}} >
                <FormControl component="fieldset">
                    <FormLabel component="legend">To Do List</FormLabel>
                    <RadioGroup
                    aria-label="position"
                    name="position"
                    column>
                    <FormControlLabel
                        value="end"
                        control={<Radio color="primary" />}
                        label="Create a Group to apply for loan"
                        labelPlacement="end"
                        />
                    <FormControlLabel
                        value="end"
                        control={<Radio color="primary" />}
                        label="A minimum of 5 member is required in a group"
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
