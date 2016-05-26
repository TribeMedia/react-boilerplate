/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import shouldPureComponentUpdate from 'react-pure-render/function';

import Header from '../../components/Header';

import { createSelector } from 'reselect';

import {
  selectRepos,
  selectLoading,
  selectError,
  selectHeaderTitle,
} from 'containers/App/selectors';

import {
  selectUsername,
} from './selectors';

import { changeUsername } from './actions';
import { loadRepos, setHeaderTitle } from '../App/actions';

import RepoListItem from 'containers/RepoListItem';
import Button from 'components/Button';
import H2 from 'components/H2';
import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

import styles from './styles.css';

export class HomePage extends React.Component {
  shouldComponentUpdate = shouldPureComponentUpdate;

  /**
   * Changes the route
   *
   * @param  {string} route The route we want to go to
   */
  openRoute = (route) => {
    this.props.changeRoute(route);
  };

  setHeaderTitle = (title) => {
    this.props.onSetTitle(title);
  };

  /**
   * Changed route to '/features'
   */
  openFeaturesPage = () => {
    this.openRoute('/features');
  };

  render() {
    let mainContent = null;

    // Show a loading indicator when we're loading
    if (this.props.loading) {
      mainContent = (<List component={LoadingIndicator} />);

    // Show an error if there is one
    } else if (this.props.error !== false) {
      const ErrorComponent = () => (
        <ListItem content={'Something went wrong, please try again!'} />
      );
      mainContent = (<List component={ErrorComponent} />);

    // If we're not loading, don't have an error and there are repos, show the repos
    } else if (this.props.repos !== false) {
      mainContent = (<List items={this.props.repos} component={RepoListItem} />);
    }

    return (
      <article>
        <div>
          <Header title={this.props.headerTitle} onMenuSelect={ () => this.openRoute('/login')} onSetTitle={ (title) => this.props.onSetTitle(title)} />
          <section className={`${styles.textSection} ${styles.centered}`}>
            <H2>User Application for A/B Testing</H2>
            <p>This application retrieves properties from an A/B testing REST service.</p>
          </section>
          <section className={styles.textSection}>
            <H2>Try me!</H2>
            <form className={styles.usernameForm} onSubmit={this.props.onSubmitForm}>
              <label htmlFor="username">Show Github repositories by
                <span className={styles.atPrefix}>@</span>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="gqadonis"
                  value={this.props.username}
                  onChange={this.props.onChangeUsername}
                />
              </label>
            </form>
            {mainContent}
          </section>
          <Button handleRoute={this.openFeaturesPage}>Features</Button>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  changeRoute: React.PropTypes.func,
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
  repos: React.PropTypes.oneOfType([
    React.PropTypes.array,
    React.PropTypes.bool,
  ]),
  onSubmitForm: React.PropTypes.func,
  username: React.PropTypes.string,
  onChangeUsername: React.PropTypes.func,
  onSetTitle: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeUsername: (evt) => dispatch(changeUsername(evt.target.value)),
    changeRoute: (url) => dispatch(push(url)),
    onSubmitForm: (evt) => {
      evt.preventDefault();
      dispatch(loadRepos());
    },
    onSetTitle: (title) => dispatch(setHeaderTitle(title)),

    dispatch,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(createSelector(
  selectRepos(),
  selectUsername(),
  selectLoading(),
  selectError(),
  selectHeaderTitle(),
  (repos, username, loading, error, headerTitle) => ({ repos, username, loading, error, headerTitle })
), mapDispatchToProps)(HomePage);
