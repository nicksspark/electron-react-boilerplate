import React from 'react';
import PDF from 'react-pdf-js';

class Reader extends React.Component {
  constructor() {
    super();
    this.state = {
      page: null,
      pages: null
    };
  }
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  onPageComplete = (page) => {
    this.setState({ page });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <a href="#" className="previous" onClick={this.handlePrevious}><i className="fa fa-arrow-left"></i> Previous</a>;
    if (page === 1) {
      previousButton = <a href="#" className="previous disabled"><i className="fa fa-arrow-left"></i> Previous</a>;
    }
    let nextButton = <a href="#" className="next" onClick={this.handleNext}>Next <i className="fa fa-arrow-right"></i></a>;
    if (page === pages) {
      nextButton = <a href="#" className="next disabled">Next <i className="fa fa-arrow-right"></i></a>;
    }
    return (
      <nav className="pager">
        {previousButton} |{' '}
        {nextButton}
      </nav>
      );
  }

  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <PDF file="./pdfs/doc.pdf" onDocumentComplete={this.onDocumentComplete} onPageComplete={this.onPageComplete} page={this.state.page} />
        {pagination}
      </div>
    )
  }
}

export default Reader;
