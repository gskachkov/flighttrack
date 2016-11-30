import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone';
import Masonry from 'react-masonry-component';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';

import Container from '../components/Container';
import { addFlightLogData } from '../actions/dataActions';
import parser from '../utils/parser';
import { distance, date, timedelta, speed } from '../utils/units';

const styles = StyleSheet.create({
  button: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    width: '50%',
    '@media (max-width: 992px)': {
      width: '100%',
    },
  },
  paper: {
    margin: 10,
    color: '#f7f7f7',
  },
});

class DashboardContainer extends Component {
  constructor(props) {
    super(props);
    this.handleOnDrop = this.handleOnDrop.bind(this);
  }

  handleOnDrop(files) {
    const { dispatch } = this.props;
    parser(files[0], (data) => {
      dispatch(addFlightLogData(data));
    });
  }

  render() {
    const { details } = this.props;
    return (
      <Container>
        <Masonry
          options={{ transitionDuration: 0 }}
        >
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>OVERVIEW</Subheader>
                <ListItem
                  disabled
                  primaryText="Aircraft"
                  secondaryText={details.aircraftName}
                />
                <ListItem
                  disabled
                  primaryText="Date"
                  secondaryText={date(details.updateTime)}
                />
                <ListItem
                  disabled
                  primaryText="Distance"
                  secondaryText={distance(details.totalDistance, false)}
                />
                <ListItem
                  disabled
                  primaryText="Flight Time"
                  secondaryText={timedelta(details.totalTime)}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>LOCATION</Subheader>
                <ListItem
                  disabled
                  primaryText="Area"
                  secondaryText={`${details.city} ${details.area}`}
                />
                <ListItem
                  disabled
                  primaryText="City"
                  secondaryText={details.subStreet}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>LIMITS</Subheader>
                <ListItem
                  disabled
                  primaryText="Max. Height"
                  secondaryText={distance(details.maxHeight, false)}
                />
                <ListItem
                  disabled
                  primaryText="Max. Horizontal Speed"
                  secondaryText={speed(details.maxHSpeed, false)}
                />
                <ListItem
                  disabled
                  primaryText="Max. Vertical Speed"
                  secondaryText={speed(details.maxVSpeed, false)}
                />
              </List>
            </Paper>
          </div>
          <div className={css(styles.item)}>
            <Paper className={css(styles.paper)}>
              <List>
                <Subheader>APP</Subheader>
                <ListItem
                  disabled
                  primaryText="Device"
                  secondaryText={details.appType}
                />
                <ListItem
                  disabled
                  primaryText="Version"
                  secondaryText={details.appVersion}
                />
              </List>
            </Paper>
          </div>
        </Masonry>
        <Dropzone
          className={css(styles.button)}
          onDrop={this.handleOnDrop}
          multiple={false}
          accept=".txt"
        >
          <FloatingActionButton>
            <UploadIcon />
          </FloatingActionButton>
        </Dropzone>
      </Container>
    );
  }
}

DashboardContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  details: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  details: state.data.details,
});

export default connect(
  mapStateToProps,
)(DashboardContainer);