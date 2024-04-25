import React from 'react';
import ContentLoader from 'react-content-loader';
const Loader = () => {
    return (
        <ContentLoader 
            viewBox="0 0 500 100" 
            backgroundColor="#e0e0e0" 
            foregroundColor="#bdbdbd" 
            speed={1} 
            style={{ width: '100%', height: '15rem' }} 
        >
            <rect x="0" y="0" rx="5" ry="5" width="100" height="100" /> 
            <rect x="120" y="0" rx="5" ry="5" width="100" height="100" /> 
            <rect x="240" y="0" rx="5" ry="5" width="100" height="100" /> 
            
        </ContentLoader>
    );
};

export default Loader;
