create table users 
(
  id bigint generated always as identity primary key,
  name text NOT NULL,
  password text NOT NULL,
  email text NOT NULL,
  avatar text default 'Default Avatar Image URL',
  joined timestamptz NOT NULL default now(),
  role text default 'commenter'
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
 
 insert into users (name, password, email, role) values ('admin', 'admin123', 'admin@gmail.com', 'admin');
 insert into users (name, password, email, role) values ('someGuy', 'someGuy123', 'someGuy@gmail.com', 'commenter');
 
 insert into articles (title, content, tags, author_id) values 
 ('some title', 'abcdefg', ARRAY['tag1', 'tag2', 'tag3'], (SELECT id as author_id from users where name = 'admin'));
 insert into articles (title, content, tags, author_id) values 
 ('another title', '1234567', ARRAY['tag2', 'tag4', 'tag5'], (SELECT id as author_id from users where name = 'admin'));
                                                              
 insert into comments (content, article_id, author_id) values 
 ('great article', (SELECT id as article_id from articles where title = 'another title'), (SELECT id as author_id from users where name = 'someGuy'));                                                         
  insert into comments (content, article_id, author_id) values 
 ('thanks', (SELECT id as article_id from articles where title = 'another title'), (SELECT id as author_id from users where name = 'admin'));