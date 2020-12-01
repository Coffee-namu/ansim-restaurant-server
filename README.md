# 안심 레스토랑 API

## 목차

* [안심 식당 정보 받기](#안심-식당-정보-받기)
* [게시판 - 게시물 가져오기](#게시판---게시물-가져오기)
* [게시물 - 등록](#게시물---등록)
* [게시물 - 가져오기](#게시물---가져오기)
* [게시물 - 댓글 등록](#게시물---댓글 등록)
* [게시물 - 편집](#게시물---편집)
* [게시물 - 삭제 / 댓글 삭제](#게시물---삭제-/-댓글-삭제)
* [식당정보 - 식당 상세정보 가져오기](#식당정보---식당-상세정보-가져오기)
* [식당정보 - 식당 상세정보 편집(소유자, 관리자 허용기능)](#식당정보---식당 상세정보 편집(소유자,-관리자-허용기능))
* [리뷰 - 리뷰 등록](#리뷰---리뷰-등록)
* [리뷰 - 리뷰 삭제](#리뷰---리뷰-삭제)
* [리뷰 - 식당의 리뷰 전부 가져오기](#리뷰---식당의-리뷰-전부-가져오기)
* [리뷰 - 리뷰 상세정보 가져오기](리뷰---리뷰-상세정보-가져오기)
* [리뷰 - 리뷰 수정](#리뷰---리뷰-수정)
* [리뷰 - 댓글 등록](리뷰---댓글-등록)
* [리뷰 - 삭제 / 댓글 삭제](#리뷰---삭제-/-댓글-삭제)

***

### 안심 식당 정보 받기(#목차)

주변에서 가까운 안심식당 정보를 받아온다.

#### URL

* /ansim

#### function 
* get

#### return 

JSON 배열 형식

```javascript

///예시
[
{
restaurant_id:"1", 
category_id:'0',
member_id:'1',
name:'string',
owner:'name',
phone:'0102456454',
location:'서울시 어쩌구',
description:'상세',
isTrusty:'0',
created:'2020.12.01,10:10:10'
},...
]

```

***

### 게시판 - 게시물 가져오기

자유게시판의 게시물을 가져온다.

#### URL

* /board/:page_number

#### function

* get
#### require

* URL의 page_number
  
#### return

JSON 배열형식

```javascript
///예시
{
document_fragment:[{document_id, member_id, title, created}...],
members : [{member_id, username}...],
}


```

***

### 게시물 - 등록

게시판에 게시글을 등록한다.

#### URL

* /board/document

#### function

* POST

### Reqire

* body : ['board_id(항상 0)','category_id(카테고리 구분 안하는 중, 항상 0)','member_id','title','content','created(없을 시 자동생성)']

#### return
```javascript

201 => success
400 => error

```

***

### 게시물 - 가져오기

게시글을 클릭하여 게시물의 내용을 가져온다.

#### URL

* /board/document/:document_number

#### function

* GET

#### require

* URL의 document_number

#### return

JSON 배열형식

```javascript
{
document:{document_id, member_id, title, content, created},
comments:[{comment_id, member_id, content},...],
members:[{member_id, username},...]
}
```

***

### 게시물 - 댓글 등록

게시물에 댓글을 작성한다.

#### URL

* /board/document/:document_number

#### function

* POST

#### require

* body : ['member_id','document_id', 'content', 'created(없을 시 자동생성)']

#### return
```javascript

201 => success
400 => error

```

***

### 게시물 - 편집

자신의 게시글을 편집한다.

#### URL

* /board/document/:document_number

#### function

* PUT

#### require

* URL : document_number
* body : ['title','content', 'created(없을 시 자동생성)']

#### return
```javascript

201 => success
400 => error

```

***

### 게시물 - 삭제 / 댓글 삭제

자신의 게시물이나, 댓글을 삭제한다.

#### URL

* /board/document/:document_number

#### function

* DELETE

#### require

* URL : document_number
* body : deleteReq => 'document'일때 문서 삭제, 'comment'일 때 댓글 삭제


#### return
```javascript

201 => success
400 => error

```

***

### 식당정보 - 식당 상세정보 가져오기

식당의 상세정보를 불러온다.

#### URL

* /ansim/restaurant/:restaurant_id

#### function

* GET

#### require 

* URL : restaurant_id

#### return
JSON 형식
```javascript

{restaurant_id, member_id, name, owner, phone, location, description, isTrusty}

```

***

### 식당정보 - 식당 상세정보 편집(소유자, 관리자 허용기능)

식당의 상세정보를 편집한다.

#### URL

* /ansim/restaurant/:restaurant_id

#### function

* PUT

#### require

* URL : restaurant_id
* body : user_id

#### return
```javascript

201 => success
400 => error

```

***

### 리뷰 - 리뷰 등록

식당에 대한 리뷰를 등록한다. 단, 식당 별로 리뷰는 하나만 작성할 수 있다.

#### URL

* /ansim/restaurant/:restaurant_id/review

#### function

* POST

#### Reqiure

* URL : restaurant_id

#### return
```javascript

201 => success
400 => error with DB
401 => already have review

```

***



### 리뷰 - 리뷰 삭제

자신이 작성한 리뷰를 삭제한다.

#### URL

* /ansim/restaurant/:restaurant_id/review

#### function

* DELETE

# require

* URL : restaurant_id
* body : member_id

#### return
```javascript

201 => success
400 => error

```

***

### 리뷰 - 식당의 리뷰 전부 가져오기

식당에 대한 리뷰를 모두 불러온다. 다만 평점만 가져온다.

#### URL

* /ansim/restaurant/:restaurant_id/review

#### function

* GET

#### require

* URL : restaurant_id

#### return
JSON 배열 혼합 형식

```javascript

{
review_fragment : [{review_id, member_id, score, created},...],
members : [{member_id, username},...],
}

```

***

### 리뷰 - 리뷰 상세정보 가져오기

리뷰의 상세정보를 가져온다. 

#### URL

* /ansim/restaurant/:restaurant_id/review/:review_id

#### function

* GET

#### require

* URL : restaurant_id, review_id

#### return
JSON 배열 혼합형태

```javascript

{
review:{review_id, restaurant_id, member_id, score, content, created},
comments:[{comment_id, member_id, content},...],
members:[{user_id, username},...],
}

```

***

### 리뷰 - 리뷰 수정

자신의 리뷰를 수정한다.

#### URL

* /ansim/restaurant/:restaurant_id/review/:review_id

#### function

* PUT

#### require

* URL : review_id
* body : 'title','content', 'created(없으면 자동 생성)'

#### return
```javascript

201 => success
400 => error

```

***

### 리뷰 - 댓글 등록

리뷰에 댓글을 작성한다.

#### URL

* /ansim/restaurant/:restaurant_id/review/:review_id

#### function

* POST

#### require

* body : 'member_id', 'review_id', 'content', 'created'

#### return
```javascript

201 => success
400 => error

```

***

### 리뷰 - 삭제 / 댓글 삭제

자신이 작성한 리뷰나 댓글을 삭제한다.

#### URL

* /ansim/restaurant/:restaurant_id/review/:review_id

#### function

* DELETE

#### require

* URL : review_id
* body : deleteReq => 'review' 일 때 리뷰 삭제, 'comment'일 때 댓글 삭제

#### return
```javascript

201 => success
400 => error

```
