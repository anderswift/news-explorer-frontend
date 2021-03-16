import './AboutAuthor.css';
import authorPhoto from '../../images/author.png';

function AboutAuthor() {
  return (
    <article className="about-author">
      <img src={authorPhoto} alt="Ander Swift" className="about-author__img" width="464" height="464" />
      <div class="about-author__content">
        <h4 className="about-author__heading">About the author</h4>
        <p className="about-author__p">Ander Swift is a developer and designer currently diving into React and Node, adapting to a MERN stack after many years of 
          working within a LAMP environment.</p>
        <p className="about-author__p">This app is the final project in Yandex's Practicum course in Web Development, designed to build experience and demonstrate skill working with 
          responsive layouts, building a dynamic React interface, creating a Node API and integrating an external API.</p>
      </div>
    </article>
  );
}

export default AboutAuthor;