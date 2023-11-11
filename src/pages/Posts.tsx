import { IonContent, IonPage, IonList, IonLabel, IonIcon, IonItem } from '@ionic/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Plugins } from '@capacitor/core';
import * as icons from 'ionicons/icons'
import { useParams } from 'react-router';
import { All, Post } from './types';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
// import { fetchData } from '../db';
// import { AuthContext } from '../context/auth.context';

const Posts: React.FC = () => {
  const { cat_name, cat_id } = useParams() as { cat_name: string; cat_id: string };
  const [posts, updatePost] = useState<Post[]>([]);
  const history = useHistory();
  // const authContext = useContext(AuthContext);

  useEffect(() => {
    filterPosts(
      // authContext!.getIsLoggedInState()
    );
  }, [
    // authContext!.getIsLoggedInState
  ]);

  useEffect(() => {
    return () => updatePost([]);
  }, []);

  const filterPosts = (isLoggedIn?: boolean): void => {
    // fetchData('all')
    //   .then((res: AllData) => {
    //     let allPosts: Post[] = res.Posts.filter((item: Post) => item && item.cat_id === cat_id)!;

    //     updatePost(isLoggedIn ? [...allPosts] : [...allPosts.filter(x => !x.is_private)]);
    //   });

    let data: Post[] = All.filter((item: Post) => item && item.cat_id === cat_id)!;
    updatePost([...data.filter(x => !x.is_private)]);
  }

  const open = (cat_id: string, cat_name: string, name: string) => { 
    const { Browser } = Plugins;
    Browser.open({ url: '/assets/Pdf/' + cat_name + '/' +  name + '.pdf'})
  }

  return (
    <IonPage>
      <Header title={cat_name} hasBack={true} backRoute="/categories" />

      <IonContent fullscreen scrollY={true}>
        <IonList>
          {
            posts.map((item, i) => (
              <Fragment key={i}>
                <IonItem onClick={() => open(cat_id, cat_name, item.name)}>
                  <IonLabel color="success">{item.name}</IonLabel>
                  <IonIcon size='small' color="dark" icon={icons.chevronBackOutline} />
                </IonItem>
              </Fragment>
            ))
          }
        </IonList>
      </IonContent>
    </IonPage >
  );
};

export default Posts;
