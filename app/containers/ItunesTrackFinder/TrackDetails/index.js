/**
 *
 * TrackDetailsPage
 *
 */

import React, { useState, useEffect, memo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Skeleton } from 'antd';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useRouter } from 'next/router';
import { createStructuredSelector } from 'reselect';

import If from '@components/If';
import Text from '@app/components/Text';
import injectSaga from '@utils/injectSaga';
import { styles, colors, fonts } from '@app/themes';
import MusicCard from '@components/MusicCard';

import saga from '../saga';
import { searchContainerCreators } from '../reducer';
import { selectItunesData, selectItunesError, selectTrackDetails } from '../selectors';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #111;
  border-radius: 10px;
  max-width: 85%;
  margin: 1rem auto;
  ${styles.primaryBackgroundColor};
  box-shadow: 0 0 5px rgba(2, 2, 2, 0.2);
`;
const Heading = styled.h1`
  ${fonts.size.big()};
  ${fonts.weights.bolder()};
  color: ${colors.primary};
  margin: 0.5rem 0;
`;
const Bold = styled.p`
  font-weight: bold;
  font-family: sans-serif;
  margin-top: 0.75rem;
`;
const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;

  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
`;
const Body = styled.div`
  padding: 1rem;
  width: 30%;
  border: 3px solid ${colors.primary};
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 0 2px #222;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;
const Music = styled.div`
  width: 70%;

  @media (max-width: 1000px) {
    width: 100%;
  }
`;

function SongDetailsPage({ intl, match, dispatchGetSongDetails, songsData, fetchedTracks, trackDetails, songsError }) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const trackId = router.query ? router.query.trackId : match.query.trackId;

  useEffect(() => {
    if (isEmpty(songsData) && isEmpty(trackDetails) && isEmpty(fetchedTracks)) {
      dispatchGetSongDetails(trackId);
      setLoading(true);
    }
  }, [dispatchGetSongDetails, fetchedTracks, songsData, trackDetails, trackId]);

  return (
    <Container>
      <If condition={!isEmpty(fetchedTracks) || loading}>
        <Head>
          <title>{fetchedTracks ? fetchedTracks.trackName : intl.formatMessage({ id: 'website_tab_title' })}</title>
          <meta
            name="description"
            content={fetchedTracks ? fetchedTracks.shortDescription : intl.formatMessage({ id: 'website_meta' })}
          />
        </Head>

        <Skeleton loading={loading} active>
          <Link href="/">{intl.formatMessage({ id: 'go_home_button_text' })}</Link>

          <If condition={fetchedTracks}>
            <Heading>{fetchedTracks.artistName}</Heading>
          </If>

          <FlexView>
            <Body>
              <If condition={fetchedTracks.collectionName}>
                <Bold>{intl.formatMessage({ id: 'track_collection' }) + ':  '}</Bold>{' '}
                <Text text={fetchedTracks.collectionName} />
              </If>

              <If condition={fetchedTracks.trackName}>
                <Bold>{intl.formatMessage({ id: 'track_name' }) + ':  '}</Bold> <Text text={fetchedTracks.trackName} />
              </If>

              <If condition={fetchedTracks.trackPrice && fetchedTracks.currency}>
                <Bold>{intl.formatMessage({ id: 'track_price' }) + ':  '}</Bold>{' '}
                <Text text={'' + fetchedTracks.trackPrice + fetchedTracks.currency} />
              </If>

              <If condition={fetchedTracks.primaryGenreName}>
                <Bold>{intl.formatMessage({ id: 'track_genre' }) + ':  '}</Bold>{' '}
                <Text text={fetchedTracks.primaryGenreName} />
              </If>
            </Body>

            <Music>
              <MusicCard {...fetchedTracks} intl={intl} />
            </Music>
          </FlexView>
        </Skeleton>
      </If>

      <If condition={songsError}>
        <Text text={intl.formatMessage({ id: 'track_name_unavailable' })} />
      </If>
    </Container>
  );
}

SongDetailsPage.propTypes = {
  dispatchGetSongDetails: PropTypes.func,
  fetchedTracks: PropTypes.object,
  trackDetails: PropTypes.object,
  songsError: PropTypes.string,
  songsData: PropTypes.object,
  match: PropTypes.object,
  intl: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  songsData: selectItunesData(),
  trackDetails: selectTrackDetails(),
  songsError: selectItunesError()
});

export function mapDispatchToProps(dispatch) {
  const { requestGetSongDetails } = searchContainerCreators;

  return {
    dispatchGetSongDetails: (trackId) => dispatch(requestGetSongDetails(trackId))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(injectIntl, withConnect, injectSaga({ key: 'searchContainer', saga }), memo)(SongDetailsPage);

export const SongDetailsPageTest = compose(injectIntl)(SongDetailsPage);