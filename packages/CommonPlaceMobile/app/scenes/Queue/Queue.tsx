import React, {type PropsWithChildren} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import BrandLogo from '../../components/BrandLogo/BrandLogo';
import InlineHeader from '../../components/InlineHeader/InlineHeader';
import InterestSelector from '../../components/InterestSelector/InterestSelector';
import PrimaryNavigation from '../../components/PrimaryNavigation/PrimaryNavigation';

const Queue = ({navigation}) => {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} />
      <InlineHeader
        leftComponent={<BrandLogo />}
        centerComponent={<InterestSelector />}
        rightComponent={<PrimaryNavigation />}
      />
    </SafeAreaView>
  );
};

export default Queue;
