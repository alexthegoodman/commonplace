import React, {useState, type PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {useQuery} from '@apollo/client';

import BrandLogo from '../../components/BrandLogo/BrandLogo';
import ContentInformation from '../../components/ContentInformation/ContentInformation';
import ContentViewer from '../../components/ContentViewer/ContentViewer';
import ImpressionBoard from '../../components/ImpressionBoard/ImpressionBoard';
import InlineHeader from '../../components/InlineHeader/InlineHeader';
import InterestSelector from '../../components/InterestSelector/InterestSelector';
import PrimaryNavigation from '../../components/PrimaryNavigation/PrimaryNavigation';

import {userQuery} from '../../graphql/queries/user';
import {queuePostsQuery} from '../../graphql/queries/post';
import {userThreadsQuery} from '../../graphql/queries/thread';

const Queue = ({navigation}) => {
  const {
    loading: userLoading,
    error: userError,
    data: userData,
  } = useQuery(userQuery, {
    variables: {},
  });

  const {
    loading: postsLoading,
    error: postsError,
    data: postsData,
  } = useQuery(queuePostsQuery, {
    variables: {interestId: null},
  });

  const {
    loading: threadsLoading,
    error: threadsError,
    data: threadsData,
  } = useQuery(userThreadsQuery, {
    variables: {},
  });

  const firstId = postsData?.getQueuePosts[0]?.id;

  console.info(
    'queue data',
    firstId,
    userData?.getUser?.credit,
    threadsData?.getUserThreads[0].id,
  );

  const [queuePostId, setQueuePostId] = useState(firstId); // defaults to first post
  const [queueFinished, setQueueFinished] = useState(firstId ? false : true);
  const [currentImpression, setCurrentImpression] = useState('');
  const [creditUi, setCreditUi] = useState(userData?.getUser?.credit);

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <InlineHeader
        leftComponent={<BrandLogo />}
        centerComponent={<InterestSelector />}
        rightComponent={<PrimaryNavigation />}
      />
      <ScrollView>
        <ContentViewer />
        <ContentInformation />
      </ScrollView>
      <ImpressionBoard />
    </SafeAreaView>
  );
};

export default Queue;
