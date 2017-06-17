import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends React.Component {
  render(){
    return (
      <div>
        <NavBar title="React Gmail Style client" user="vadillo.jon@gmail.com" />
        <MainContainer />
      </div>
    )
  }
}

/**
 * Top navigation navbar containing title and username. Irrelevant for the purpose of the example.
 */
class NavBar extends React.Component {
    
  render() {
    //For the purpose of this exampel, the NavBar has no interation and is just JSX.
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <img className="nav-logo" src="https://facebook.github.io/react/img/logo.svg" width="36" height="36" />
        <a className="navbar-brand" href="#">{this.props.title}</a>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        
        <ul className="navbar-nav ml-auto">
          
          <li className="nav-item active">
          <a className="nav-link" href="#">&nbsp;<i className="fa fa-calendar" aria-hidden="true"></i>&nbsp;</a>
          </li>
          <li className="nav-item active">
          <a className="nav-link" href="#">&nbsp;<i className="fa fa-th" aria-hidden="true"></i>&nbsp;</a>
          </li>
          <li className="nav-item active">
          <a className="nav-link" href="#">{this.props.user} <span className="sr-only">(current)</span><i className="fa fa-angle-down" aria-hidden="true"></i></a>
          </li>
        </ul>
        </div>
      </nav>
    ) 
  }
}

class EmailLabels extends React.Component {
  
  static defaultProps = {
    //Labels will be static for this example.
    labels: [{
      id : 1,
      name: 'Inbox',
      emailNumber : 4
    },{
      id : 2,
      name: 'Important',
      emailNumber : 2
    },{
      id : 3,
      name: 'Sent',
      emailNumber : 9
    },{
      id : 4,
      name: 'Trash',
      emailNumber : 12
    }]
  }; //Babel v6.4 Requires semicolons after class properties
  
  render() {
    return (
      <ul className="list-group">
        {/* Iterate to create labels from the props */}
        {this.props.labels.map((label) => (
            <LabelItem
              key={label.id}
              id={label.id}
              label={label}
              onClick={this.props.onLabelClick}/>
        ))}
      </ul>
    )
  }
}

class LabelItem extends React.Component {
  
  handleClick(){
    console.log('handleClick '+this.props.id);
    this.props.onClick(this.props.id);
  }
  
  render(){ 
    return (
        <li className="list-group-item justify-content-between" onClick={this.handleClick.bind(this)}>
          {this.props.label.name}
          <span className="badge badge-default badge-pill">{this.props.label.emailNumber}</span>
        </li>
    )
  }
}

class Tab extends React.Component {
  render(){
    console.log(this.props.activeTab);
    // Classes to add to the <a> element
    let tabClasses = ["nav-link"];
    // Classes to add to the <i> element (the icon)
    let iconClasses = ["fa",this.props.icon];

    // Update the class array if the state is visible
    if (this.props.activeTab) {
      tabClasses.push("active");
      console.log("active");
    }
    
    return (
        <li className="nav-item">
            <a className={tabClasses.join(' ')} href="#">
              <i className={iconClasses.join(' ')}></i>&nbsp;&nbsp;{this.props.name}
            </a>
        </li>
    )
  }
}

class EmailList extends React.Component {
  
  handleEmailClick = (id) => {
    alert('Clicked'+id);
  };

  render(){
    return (
      <div>
        {/* Tabs created only as an example, they don't interact with the rest of the app. */}
        <ul className="nav nav-tabs">
          <Tab name="Inbox" activeTab={true} icon="fa-inbox" />
          <Tab name="Social" activeTab={false} icon="fa-users" />
          <Tab name="Notifications" activeTab={false} icon="fa-tags" />
          <Tab name="Updates" activeTab={false} icon="fa-info-circle" />
        </ul>
        <div className="list-group">
          {/* EmailItem creation: */}
          {this.props.emails.map((email) => (
              <EmailItem
                key={email.id}
                email={email}
                handleEmailClick={this.handleEmailClick}/>
          ))}
        </div>
      </div>
    )
  }
}

class EmailItem extends React.Component {
  
  handleEmailClick() {
    //Call to the parent's method passed through properties.
    this.props.handleEmailClick(this.props.email.id);
  }
  
  render(){
    return (
      <li className="list-group-item d-flex justify-content-start" onClick={this.handleEmailClick.bind(this)}>
          <div className="checkbox">
            <input type="checkbox" />
          </div>

          &nbsp;&nbsp;<span className="fa fa-star-o"></span>&nbsp;&nbsp;
          <span className="name">{this.props.email.from}</span> 
          <span>{this.props.email.subject}</span>
          
          <span className="ml-auto p-2">
            <span className="fa fa-paperclip">&nbsp;&nbsp;</span>
            <span className="badge badge-default badge-pill">{this.props.email.time}</span>
          </span>
        </li>
        
    )
  }
}

class EmptyBox extends React.Component {
  
  render(){
    return (
      <p className="center">The email box is empty.</p>
    )
  }
}

/**
 * Main class which contains the labels and the email list.
 */
class MainContainer extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {
      selectedLabel : 1
    }
  }
  
  handleLabelClick(labelId){
    console.log('Label clicked: '+labelId);
    this.setState({
      selectedLabel: labelId
    });
  }
  
  static defaultProps = {
    //Emails to be displayed on the Email List
    emails : [
      {
        id: 0,
        labelId: 1,
        from: 'Mike James',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "11:15"
      },
      {
        id: 1,
        labelId: 1,
        from: 'Emma Thompson',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "22:08"
      },
      {
        id: 2,
        labelId: 1,
        from: 'Olivia Jefferson',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "19:12"
      },
      {
        id: 3,
        labelId: 1,
        from: 'Mike Conley',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "18:35"
      },
      {
        id: 4,
        labelId: 2,
        from: 'Emily Iverson',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "14:05"
      },
      {
        id: 5,
        labelId: 3,
        from: 'Michael Neal',
        subject: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: "14:05"
      }
    ]
  };

  render() {
    console.log(this.props.emails[0].labelId);
    const filteredEmails = this.props.emails.filter(e => e.labelId & e.labelId == this.state.selectedLabel);
    
    let content = null;
    if(filteredEmails.length > 0){
       content = <EmailList emails={filteredEmails} />;
    } else {
       content = <EmptyBox />;
    }
    
    return (
      <div className="container">
        <ActionsRow />
        <hr />
        <div className="row">
          <div className="col-12 col-sm-12 col-md-3 col-lg-2">
            <EmailLabels onLabelClick={this.handleLabelClick.bind(this)} />
          </div> 
          <div className="col-12 col-sm-12 col-md-9 col-lg-10">
            {content}        
          </div>
        </div>
      </div>
    )
  }
}

/**
 * Come options for showing how to emulate Gmail using Bootsrap 4.
 */
class ActionsRow extends React.Component {
  
  render(){
    return (
    
      <div className="row"> 
        <div className="col-12 col-sm-12 col-md-3 col-lg-2">
          <a href="#" className="btn btn-danger btn-primary btn-block">
            <i className="fa fa-edit"></i> Compose
          </a>
        </div>
        <div className="col-12 col-sm-12 col-md-9 col-lg-10">
          <div className="btn-group" role="group" aria-label="Button group with nested dropdown">
            <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-refresh" aria-hidden="true"></i>&nbsp;</button>
            <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-star" aria-hidden="true"></i>&nbsp;</button>
          </div>
          <div className="btn-group" role="group">
            <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              More
            </button>
            <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <a className="dropdown-item" href="#">Something else here</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Separated link</a>
            </div>
          </div>
      
          <div className="pull-right">
                  <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-cog" aria-hidden="true"></i>&nbsp;</button>
            <button type="button" className="btn btn-secondary">&nbsp;<i className="fa fa-bars" aria-hidden="true"></i>&nbsp;</button>
                </div>
        </div>
      </div>
    )
  } 
}

export default App;
