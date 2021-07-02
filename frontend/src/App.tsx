import React from 'react';
import './App.css';
import { VFC,useEffect} from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import Header from './components/Header'
import PostShow from './components/posts/PostShow';
import PostForm from './components/posts/PostForm';
import Test from './components/test'
import ProfileEdit from './components/profile/ProfileEdit';
import ProfileShow from './components/profile/ProfileShow';
import PostsIndex from './components/posts/PostsIndex';
import { useQueryPosts } from './hooks/reactQuery/useQueryPosts';


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: VFC = () => {
  return (
    
    <div className='relative h-screen'>
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <Header/>
        <Switch>
          <Route exact path="/posts">
            {/* <MainTag/> */}
            <PostsIndex/>
          </Route>
          <Route exact path="/posts/new">
            <PostForm/>
          </Route>
          <Route
          exact path="/posts/:postId"
          render={({ match }:any) =>
          <PostShow
          match={match}
          />
          }
          />
          <Route
          exact path="/posts/edit/:postId"
          render={({ match }:any) =>
          <PostForm
          match={match}
          />
          }
          />
          <Route exact path="/profile/edit/:profileId"
          render={({ match }:any) =>
          <ProfileEdit
          match={match}
          />
          }
          />
          <Route exact path="/profile/:profileId"
          render={({ match }:any) =>
          <ProfileShow
          match={match}
          />
          }
          />
          <Route exact path="/test">
            <Test/>
          </Route>
        </Switch>
        </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </div>

  );
}

export default App;
