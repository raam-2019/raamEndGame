    Components folder will contain all the components. In react the pages are called component. 
    
        1st Component is Mapbox component. Everything Mapbox will render will be coded here (** matrics) aka widget 0
        
            2nd Component is Core Temp + Skin Temp (Graph).  aka widget 1
            
                3rd Component is HR + BR aka widget 2
                
                    and so on...


                    We will chose the components we want and call them in the fanexperience page aand 
                    dashboard page respectively.

                    Customization is in the Stylesheet.css in src/Assets 
                    And grid position customization is in the fanexperience.js (col,row)
                    


        To run the project type     yarn && yarn start     and delete package-lock before that to avoid conflict.
                
                Or
                
                    npm install
                        npm start        but before delete yarn.lock
                        
                        
                                    Use wither Yarn or NMP but not both together. This is cause problems. 
                                        Always add new framework to the package.json file. 
