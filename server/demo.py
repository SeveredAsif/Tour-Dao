#!/usr/bin/env python
# coding: utf-8

# In[1]:

import pandas as pd
import numpy as np

#data = pd.read_csv('Reviews.csv',encoding='ISO-8859-1')
city = pd.read_csv('City.csv')
places = pd.read_csv('Places.csv')


# In[4]:


places = places.merge(city,on='City')


# In[6]:


new_places = places[['City','Place','City_desc','Place_desc']]


# In[7]:


def convert(text):
    text = text.split('. ', 1)[1]
    return text        


# In[8]:


new_places['Place'] = new_places['Place'].apply(convert)

# In[10]:


from nltk.stem.porter import PorterStemmer
ps = PorterStemmer()


# In[11]:


def stem(text):
    y=[]
    for i in text.split():
        y.append(ps.stem(i))

    return " ".join(y)


# In[12]:


new_places['Place_desc'] = new_places['Place_desc'].apply(stem)



# In[15]:


new_places['Place_desc'] = new_places['Place_desc'].apply(lambda x:x.lower())


# In[17]:


from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer(stop_words='english')


# In[19]:


vectors = cv.fit_transform(new_places['Place_desc']).toarray()



# In[25]:


from sklearn.metrics.pairwise import cosine_similarity
similarity = cosine_similarity(vectors)


# In[43]:


def recommend(Place):
    place_index = new_places[new_places['Place'].str.strip() == Place].index[0]
    distances = similarity[place_index] 
    place_list = sorted(list(enumerate(distances)),reverse=True,key=lambda x:x[1])[1:6]

    for i in place_list:
        print(new_places.iloc[i[0]].Place)


# In[53]:




import sys

# Retrieve arguments passed from Node.js
arg1 = sys.argv[1]

recommend(arg1)



