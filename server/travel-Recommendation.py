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


new_places = places[['City','Place','City_desc','Place_desc','Distance','Ratings_x']]


# In[7]:


def convert(text):
    text = text.split('. ', 1)[1]
    return text        


# In[8]:

new_places['Place'] = new_places['Place'].apply(convert)
new_places['Ratings_x'] = new_places['Ratings_x'].fillna(0)

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
import json

def recommend(Place):
    place_index = new_places[new_places['Place'].str.strip() == Place].index[0]
    distances = similarity[place_index] 
    place_list = sorted(list(enumerate(distances)), reverse=True, key=lambda x: x[1])[0:6]

    recommendations = []
    
    for i in place_list:
        place_info = {
            'city': new_places.iloc[i[0]].City,  # Assuming there's a 'City' column
            'place': new_places.iloc[i[0]].Place,
            'description': new_places.iloc[i[0]].Place_desc,
            'distance': new_places.iloc[i[0]].Distance,# Assuming there's a 'Description' column
            'ratings': new_places.iloc[i[0]].Ratings_x
        }
        recommendations.append(place_info)

    recommendations_json = json.dumps(recommendations, indent=4)
    print(recommendations_json)


# In[53]:




import sys

# Retrieve arguments passed from Node.js
arg1 = sys.argv[1]

recommend(arg1)



