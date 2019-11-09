import React from 'react';
import {Grid, Button} from 'semantic-ui-react';


class UpdateRepositoryPage extends React.Component{
    constructor(props){
        super(props)
        this.id = this.props.id;
    }

    render(){
        return <Grid centered stackable columns={2}>
                    <Grid.Row>
                        <Grid.Column>
                            <h1>{this.id}</h1>
                        </Grid.Column>    
                    </Grid.Row>
                </Grid>
    }
}

export default UpdateRepositoryPage;