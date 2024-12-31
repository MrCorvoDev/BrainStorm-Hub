import {useContext} from 'react';

import {TagContext} from '../contexts/TagContext';

const useTag = () => useContext(TagContext);

export default useTag;
