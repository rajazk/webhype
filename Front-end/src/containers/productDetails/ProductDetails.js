import React, { Component } from "react";
import PostDetail from "../postDetail/PostDetail";
import {
  Row,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      AllProduct: this.props.products,
      ProductId: parseInt(this.props.match.params.id),
      CurrentProduct: null,
      activeTab: "1",
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    let CurrentProductId = this.state.ProductId;
    let allproductdata = this.state.AllProduct;
    if (allproductdata && allproductdata.length > 0) {
      allproductdata.map((product) => {
        if (product.id === CurrentProductId) {
          this.setState({
            ...this.state,
            CurrentProduct: product,
          });
        }
      });
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }
  render() {
    const Productedit = this.state.CurrentProduct;
    return (
      <div>
        {Productedit !== null ? (
          <div className="site-content">
            <div className="content-wrapper section-ptb">
              <Container>
                <PostDetail
                  product={Productedit}
                  tabid={this.state.activeTab}
                />
                <div className="product-content-bottom">
                  <Nav tabs>
                    <NavItem active>
                      <NavLink
                        className={classnames({
                          active: this.state.activeTab === "1",
                        })}
                        onClick={() => {
                          this.toggle("1");
                        }}
                      >
                        Description
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                      <div className="tab-content" id="myTabContent">
                        <div
                          className="tab-pane fade show active"
                          id="description"
                          role="tabpanel"
                          aria-labelledby="home-tab"
                        >
                          <h2>What is Lorem Ipsum?</h2>
                          <p>
                            <strong>Lorem Ipsum</strong> is simply dummy text of
                            the printing and typesetting industry. Lorem Ipsum
                            has been the industry’s standard dummy text ever
                            since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type
                            specimen book. It has survived not only five
                            centuries, but also the leap into electronic
                            typesetting, remaining essentially unchanged. It was
                            popularised in the 1960s with the release of
                            Letraset sheets containing Lorem Ipsum passages, and
                            more recently with desktop publishing software like
                            Aldus PageMaker including versions of Lorem Ipsum.
                          </p>
                          <h2>Why do we use it?</h2>
                          <p>
                            It is a long established fact that a reader will be
                            distracted by the readable content of a page when
                            looking at its layout. The point of using Lorem
                            Ipsum is that it has a more-or-less normal
                            distribution of letters, as opposed to using
                            ‘Content here, content here’, making it look like
                            readable English. Many desktop publishing packages
                            and web page editors now use Lorem Ipsum as their
                            default model text, and a search for ‘lorem ipsum’
                            will uncover many web sites still in their infancy.
                            Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose
                            (injected humour and the like).
                          </p>
                          <h2>Where does it come from?</h2>
                          <p>
                            Contrary to popular belief, Lorem Ipsum is not
                            simply random text. It has roots in a piece of
                            classical Latin literature from 45 BC, making it
                            over 2000 years old. Richard McClintock, a Latin
                            professor at Hampden-Sydney College in Virginia,
                            looked up one of the more obscure Latin words,
                            consectetur, from a Lorem Ipsum passage, and going
                            through the cites of the word in classical
                            literature, discovered the undoubtable source. Lorem
                            Ipsum comes from sections 1.10.32 and 1.10.33 of “de
                            Finibus Bonorum et Malorum” (The Extremes of Good
                            and Evil) by Cicero, written in 45 BC. This book is
                            a treatise on the theory of ethics, very popular
                            during the Renaissance. The first line of Lorem
                            Ipsum, “Lorem ipsum dolor sit amet..”, comes from a
                            line in section 1.10.32.
                          </p>
                          <p>
                            The standard chunk of Lorem Ipsum used since the
                            1500s is reproduced below for those interested.
                            Sections 1.10.32 and 1.10.33 from “de Finibus
                            Bonorum et Malorum” by Cicero are also reproduced in
                            their exact original form, accompanied by English
                            versions from the 1914 translation by H. Rackham.
                          </p>
                          <h2>Where can I get some?</h2>
                          <p className="mb-0">
                            There are many variations of passages of Lorem Ipsum
                            available, but the majority have suffered alteration
                            in some form, by injected humour, or randomised
                            words which don’t look even slightly believable. If
                            you are going to use a passage of Lorem Ipsum, you
                            need to be sure there isn’t anything embarrassing
                            hidden in the middle of text. All the Lorem Ipsum
                            generators on the Internet tend to repeat predefined
                            chunks as necessary, making this the first true
                            generator on the Internet. It uses a dictionary of
                            over 200 Latin words, combined with a handful of
                            model sentence structures, to generate Lorem Ipsum
                            which looks reasonable. The generated Lorem Ipsum is
                            therefore always free from repetition, injected
                            humour, or non-characteristic words etc.
                          </p>
                        </div>
                      </div>
                    </TabPane>
                  </TabContent>
                </div>
              </Container>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

const AppMapStateToProps = (state) => {
  return {
    products: state.data.products,
  };
};

export default connect(AppMapStateToProps)(withRouter(ProductDetail));
