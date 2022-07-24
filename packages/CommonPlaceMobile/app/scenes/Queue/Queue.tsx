import React, {useEffect, useState, type PropsWithChildren} from 'react';
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
import {useImageUrl} from '../../hooks/useImageUrl';
import {usePreloadImage} from '../../hooks/usePreloadImage';

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

  useEffect(() => {
    setQueuePostId(firstId);
    setQueueFinished(firstId ? false : true);
  }, [firstId]);

  // get currentPost via id
  const currentPost = postsData?.getQueuePosts?.filter(
    (post, i) => post.id === queuePostId,
  )[0];

  const currentPostIndex = postsData?.getQueuePosts.findIndex(
    (post, x) => post.id === currentPost?.id,
  );

  console.info('currentPost', queuePostId, currentPost);

  useEffect(() => {
    if (typeof currentPost?.id === 'undefined') {
      // reached end of queue
      setQueueFinished(true);
    } else {
      setQueueFinished(false);
    }
  }, [currentPostIndex]);

  // preload next image
  // const nextPost = postsData?.getQueuePosts[currentPostIndex + 1];
  // const nextPostId = nextPost?.id;

  // const {imageUrl} = useImageUrl(nextPost?.content, {
  //   width: 800,
  // });

  // console.info('imageUrl', imageUrl);

  // usePreloadImage(imageUrl);

  const impressionClickHandler = () => {};

  if (userLoading || postsLoading) {
    return <></>;
  }

  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <InlineHeader
        leftComponent={<BrandLogo />}
        centerComponent={<InterestSelector />}
        rightComponent={<PrimaryNavigation />}
      />
      <ScrollView style={{position: 'absolute', width: '100%'}}>
        <ContentViewer
          type={currentPost?.contentType}
          preview={currentPost?.contentPreview}
          content={currentPost?.content}
        />
        <ContentInformation post={currentPost} />
      </ScrollView>
      <ImpressionBoard
        creditCount={creditUi}
        onImpressionClick={impressionClickHandler}
      />
    </SafeAreaView>
  );
};

export default Queue;
