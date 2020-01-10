let CTYPE = (() => {

    return {

        pagination: {pageSize: 10},
        commonPagination: {showQuickJumper: true, showSizeChanger: true, showTotal: total => `总共 ${total} 条`},

        bannerTypes: {HOME: 1, CASE: 2},

    }

})();

export default CTYPE;