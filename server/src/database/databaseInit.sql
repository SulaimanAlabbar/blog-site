create table users 
(
  id bigint generated always as identity primary key,
  name text NOT NULL,
  password text NOT NULL,
  email text NOT NULL,
  avatar text default 'Default Avatar Image URL',
  joined timestamptz NOT NULL default now(),
  role text default 'user'
 );
 
 create table articles 
(
  id bigint generated always as identity primary key,
  title text NOT NULL,
  content text NOT NULL,
  tags text[],
  author_id bigint NOT NULL,
  created timestamptz NOT NULL default now(),
  edited timestamptz NOT NULL default now(),
  FOREIGN KEY (author_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
 );
 
 create table comments 
(
  id bigint generated always as identity primary key,
  content text NOT NULL,
  article_id bigint NOT NULL,
  author_id bigint NOT NULL,
  created timestamptz NOT NULL default now(),
  FOREIGN KEY (article_id) REFERENCES articles(id) ON UPDATE CASCADE ON DELETE CASCADE,
  FOREIGN KEY (author_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
 );
 
 insert into users (name, password, email, role) values ('owner', 'owner123', 'owner@gmail.com', 'owner');
 insert into users (name, password, email, role) values ('someGuy', 'someGuy123', 'someGuy@gmail.com', 'user');
 
 insert into articles (title, content, tags, author_id) values 
 ('some title', 'abcdefg', ARRAY['tag1', 'tag2', 'tag3'], (SELECT id as author_id from users where name = 'owner'));
 insert into articles (title, content, tags, author_id) values 
 ('another title', '1234567', ARRAY['tag2', 'tag4', 'tag5'], (SELECT id as author_id from users where name = 'owner'));
                                                              
 insert into comments (content, article_id, author_id) values 
 ('great article', (SELECT id as article_id from articles where title = 'another title'), (SELECT id as author_id from users where name = 'someGuy'));                                                         
  insert into comments (content, article_id, author_id) values 
 ('thanks', (SELECT id as article_id from articles where title = 'another title'), (SELECT id as author_id from users where name = 'owner'));  
 
create table blog_info 
(
  id bigint generated always as identity primary key,
  owner_id bigint NOT NULL,
  banner_image text default 'Default Banner Image URL',
  banner_text text default 'Default Banner Text',
  description text NOT NULL,
  FOREIGN KEY (owner_id) REFERENCES users(id) ON UPDATE CASCADE ON DELETE CASCADE
 );

 insert into blog_info (owner_id, banner_image, description) values (1, 'https://i.imgur.com/BadcFyF.png',
'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum lacinia semper ante, vitae vehicula ante faucibus sed. In quis lectus sit amet nisl egestas euismod. Sed ultricies risus vel ligula aliquam scelerisque eget eu odio. Sed gravida eleifend magna in feugiat. Praesent dictum pharetra est, volutpat dapibus erat.'
);

                                                                   