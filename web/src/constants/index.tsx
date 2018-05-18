// message types
export const ADD_MESSAGE = 'ADD_MESSAGE';
export type ADD_MESSAGE = typeof ADD_MESSAGE;

export const GET_MESSAGES = 'GET_MESSAGES';
export type GET_MESSAGES = typeof GET_MESSAGES;

// comment types
export const UPDATEING_COMMENTS = 'UPDATEING_COMMENTS';
export type UPDATEING_COMMENTS = typeof UPDATEING_COMMENTS;

export const UPDATEING_COMMENTS_SUCCEED = 'UPDATEING_COMMENTS_SUCCEED';
export type UPDATEING_COMMENTS_SUCCEED = typeof UPDATEING_COMMENTS_SUCCEED;

export const UPDATEING_COMMENTS_REJECTED = 'UPDATEING_COMMENTS_REJECTED';
export type UPDATEING_COMMENTS_REJECTED = typeof UPDATEING_COMMENTS_REJECTED;

// modal types
export const SHOW_ADD_MESSAGE_MODAL = 'SHOW_ADD_MESSAGE_MODAL';
export type SHOW_ADD_MESSAGE_MODAL = typeof SHOW_ADD_MESSAGE_MODAL;

export const HIDE_ADD_MESSAGE_MODAL = 'HIDE_ADD_MESSAGE_MODAL';
export type HIDE_ADD_MESSAGE_MODAL = typeof HIDE_ADD_MESSAGE_MODAL;

// url prifix for rest api
// export const URL_PREFIX = 'https://tuntunshudong.firebaseio.com/';
export const URL_PREFIX = 'http://47.254.31.76:8000/api/';
export type URL_PREFIX = typeof URL_PREFIX;
