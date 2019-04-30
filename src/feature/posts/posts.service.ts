import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  findAll({authorId}) {
    return [{
      id: 1,
      title: '啦啦啦啦德玛西亚'
    }]
  }

  upvoteById({id}: {id: number}) {
    return {
      id: id,
      title: '啦啦啦啦德玛西亚'
    }
  }

  upvoteByIdObj(postIdObj: {postId: number}) {
    return {
      id: postIdObj.postId,
      title: '啦啦啦啦德玛西亚'
    }
  }
}
