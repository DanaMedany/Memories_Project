import { combineReducers } from "redux";

import reducerPosts from "./posts";

export const reducers = combineReducers({ posts: reducerPosts });
