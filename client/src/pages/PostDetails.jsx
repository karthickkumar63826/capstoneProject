import React from "react";
import PostAuthor from "../components/PostAuthor";
import { Link } from "react-router-dom";
import Thumbnail from "../images/blog22.jpg";

const PostDetails = () => {
  return (
    <section className="post-detail">
      <div className="container post-detail_container">
        <div className="post-detail_header">
          <PostAuthor />

          <div className="post-detail_buttons">
            <Link to={"/post/id/edit"} className="btn sm primary">
              Edit
            </Link>
            <Link to={"/post/id/delete"} className="btn sm danger">
              Delete
            </Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className="post-detail_thumbnail">
          <img src={Thumbnail} alt="" />
        </div>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
          quibusdam, ipsam sit doloremque nisi corporis eos inventore quam
          incidunt non animi nobis aliquid iste maxime quo? Quis quos, quidem
          rem soluta dolore illo vel perferendis in! Deserunt perferendis harum
          delectus?
        </p>
        <br />
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima velit
          eius facere accusamus fuga magni rem minus esse voluptates, harum illo
          iste similique molestias ipsum nesciunt perferendis voluptatum,
          repudiandae, exercitationem id voluptatem blanditiis! Id iure
          eligendi, fugit ipsum nostrum temporibus rerum amet aut quod dolorem
          placeat pariatur animi doloremque quas eaque enim perferendis nisi
          ipsam.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus
          ullam molestiae soluta aspernatur distinctio perferendis asperiores?
          Cupiditate sit velit voluptatem quis nulla porro totam quam corporis,
          quod quia placeat molestias inventore aspernatur magnam, minima a?
          Totam quia tempore sit officiis modi unde vitae nostrum fuga ipsum
          deserunt, ut esse quisquam possimus architecto ex nihil? Amet aperiam
          dolorem iste, aut molestiae exercitationem quas nostrum provident?
          Suscipit, autem. Temporibus nam id expedita. Voluptatem explicabo,
          quibusdam reiciendis delectus ut sapiente consectetur. Esse odit
          consequuntur rem placeat molestias minima voluptate sequi labore?
          Fugiat vel ut facere libero, voluptatum tenetur similique id,
          voluptatem dicta, officia facilis magnam suscipit. Libero natus iste
          laudantium dolor a ipsam hic!
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
          mollitia amet facere qui cum quis sunt necessitatibus repellat.
          Impedit, officiis.
        </p>
        <br />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint
          quisquam, asperiores doloremque quia obcaecati, laudantium sunt
          architecto molestiae iusto repudiandae perspiciatis inventore, aut
          similique quae optio iure non. In beatae voluptas totam officiis autem
          dolorem explicabo! Unde ullam minima aut molestiae repellendus
          suscipit itaque, obcaecati vero non saepe, nisi nostrum dignissimos
          nulla blanditiis ipsum ratione, provident odio. Expedita voluptates
          pariatur cum nam beatae, rerum laudantium facilis ad alias sapiente,
          ullam aut omnis exercitationem. Non, velit! Ipsum consectetur incidunt
          distinctio sequi neque sapiente, temporibus nemo? Non sed assumenda
          illo veniam optio ea reprehenderit eius quae repellat explicabo
          repudiandae sint numquam, eveniet nihil, molestias architecto quos
          voluptatem facilis? Commodi tenetur eaque non nulla nam soluta placeat
          dolore perspiciatis repudiandae, itaque fuga quos, inventore obcaecati
          rem magni maiores praesentium consectetur ratione. Totam consequuntur
          tenetur illo eligendi vitae cum quaerat quis aut exercitationem ut,
          est repellat voluptas voluptate. Eum repellendus esse temporibus
          voluptas labore dicta, ducimus quos voluptatem numquam praesentium!
          Facilis recusandae, aperiam animi facere eum adipisci corporis modi
          quasi ut ipsam, rerum totam aliquid sunt dicta a minus porro, nulla
          doloribus mollitia doloremque architecto! Aliquid aut, mollitia odit
          nesciunt voluptate libero tempora quisquam esse voluptates eos
          exercitationem ipsum voluptatem qui pariatur quos eaque.
        </p>
      </div>
    </section>
  );
};

export default PostDetails;
