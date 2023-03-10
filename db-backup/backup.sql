PGDMP                         z            forecast    14.5    14.5 '    (           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            )           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            *           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            +           1262    34373    forecast    DATABASE     l   CREATE DATABASE forecast WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'English_United States.1252';
    DROP DATABASE forecast;
                postgres    false            ?            1259    34431    cashflowobjects    TABLE     ?   CREATE TABLE public.cashflowobjects (
    cfo_id character varying NOT NULL,
    cfo_name character varying,
    cfo_isinflow boolean,
    is_in_flow boolean
);
 #   DROP TABLE public.cashflowobjects;
       public         heap    postgres    false            ?            1259    34456 
   categories    TABLE     ?   CREATE TABLE public.categories (
    category_id integer NOT NULL,
    category_name character varying(255),
    category_series integer,
    country_id integer,
    geo_id integer,
    parent integer
);
    DROP TABLE public.categories;
       public         heap    postgres    false            ?            1259    34534    cfo_data    TABLE     )  CREATE TABLE public.cfo_data (
    cfo_data_id integer NOT NULL,
    cfo_id character varying NOT NULL,
    _year integer NOT NULL,
    _month integer NOT NULL,
    gst integer NOT NULL,
    tds integer NOT NULL,
    amount integer NOT NULL,
    isforecast boolean,
    status integer NOT NULL
);
    DROP TABLE public.cfo_data;
       public         heap    postgres    false            ?            1259    34533    cfo_data_cfo_data_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.cfo_data_cfo_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.cfo_data_cfo_data_id_seq;
       public          postgres    false    219            ,           0    0    cfo_data_cfo_data_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.cfo_data_cfo_data_id_seq OWNED BY public.cfo_data.cfo_data_id;
          public          postgres    false    218            ?            1259    34461    country    TABLE     j   CREATE TABLE public.country (
    country_id integer NOT NULL,
    country_name character varying(255)
);
    DROP TABLE public.country;
       public         heap    postgres    false            ?            1259    34382    forecast_users    TABLE     ?   CREATE TABLE public.forecast_users (
    uid integer NOT NULL,
    unm character varying,
    pwd character varying,
    fname character varying,
    lname character varying
);
 "   DROP TABLE public.forecast_users;
       public         heap    postgres    false            ?            1259    34381    forecast_users_uid_seq    SEQUENCE     ?   CREATE SEQUENCE public.forecast_users_uid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.forecast_users_uid_seq;
       public          postgres    false    210            -           0    0    forecast_users_uid_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.forecast_users_uid_seq OWNED BY public.forecast_users.uid;
          public          postgres    false    209            ?            1259    34466    geographies    TABLE     ?   CREATE TABLE public.geographies (
    geo_id integer NOT NULL,
    geo_category_id integer NOT NULL,
    geo_name character varying(255)
);
    DROP TABLE public.geographies;
       public         heap    postgres    false            ?            1259    34471    mapping_master    TABLE     u   CREATE TABLE public.mapping_master (
    map_id integer NOT NULL,
    object_id integer,
    object_value integer
);
 "   DROP TABLE public.mapping_master;
       public         heap    postgres    false            ?            1259    34476    master    TABLE     ?   CREATE TABLE public.master (
    id integer NOT NULL,
    question character varying(255),
    object_value character varying(255),
    object_id integer NOT NULL,
    questionparent integer
);
    DROP TABLE public.master;
       public         heap    postgres    false            ?            1259    34483    rules    TABLE     ?   CREATE TABLE public.rules (
    rule_id integer NOT NULL,
    category_id integer,
    parent integer,
    rule_name character varying(255)
);
    DROP TABLE public.rules;
       public         heap    postgres    false            ~           2604    34537    cfo_data cfo_data_id    DEFAULT     |   ALTER TABLE ONLY public.cfo_data ALTER COLUMN cfo_data_id SET DEFAULT nextval('public.cfo_data_cfo_data_id_seq'::regclass);
 C   ALTER TABLE public.cfo_data ALTER COLUMN cfo_data_id DROP DEFAULT;
       public          postgres    false    219    218    219            }           2604    34385    forecast_users uid    DEFAULT     x   ALTER TABLE ONLY public.forecast_users ALTER COLUMN uid SET DEFAULT nextval('public.forecast_users_uid_seq'::regclass);
 A   ALTER TABLE public.forecast_users ALTER COLUMN uid DROP DEFAULT;
       public          postgres    false    210    209    210                      0    34431    cashflowobjects 
   TABLE DATA           U   COPY public.cashflowobjects (cfo_id, cfo_name, cfo_isinflow, is_in_flow) FROM stdin;
    public          postgres    false    211   ?+                 0    34456 
   categories 
   TABLE DATA           m   COPY public.categories (category_id, category_name, category_series, country_id, geo_id, parent) FROM stdin;
    public          postgres    false    212   ?,       %          0    34534    cfo_data 
   TABLE DATA           l   COPY public.cfo_data (cfo_data_id, cfo_id, _year, _month, gst, tds, amount, isforecast, status) FROM stdin;
    public          postgres    false    219   ?,                 0    34461    country 
   TABLE DATA           ;   COPY public.country (country_id, country_name) FROM stdin;
    public          postgres    false    213   ?-                 0    34382    forecast_users 
   TABLE DATA           E   COPY public.forecast_users (uid, unm, pwd, fname, lname) FROM stdin;
    public          postgres    false    210   ?-                  0    34466    geographies 
   TABLE DATA           H   COPY public.geographies (geo_id, geo_category_id, geo_name) FROM stdin;
    public          postgres    false    214   .       !          0    34471    mapping_master 
   TABLE DATA           I   COPY public.mapping_master (map_id, object_id, object_value) FROM stdin;
    public          postgres    false    215   .       "          0    34476    master 
   TABLE DATA           W   COPY public.master (id, question, object_value, object_id, questionparent) FROM stdin;
    public          postgres    false    216   ;.       #          0    34483    rules 
   TABLE DATA           H   COPY public.rules (rule_id, category_id, parent, rule_name) FROM stdin;
    public          postgres    false    217   X.       .           0    0    cfo_data_cfo_data_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.cfo_data_cfo_data_id_seq', 45, true);
          public          postgres    false    218            /           0    0    forecast_users_uid_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.forecast_users_uid_seq', 1, true);
          public          postgres    false    209            ?           2606    34437 $   cashflowobjects cashflowobjects_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.cashflowobjects
    ADD CONSTRAINT cashflowobjects_pkey PRIMARY KEY (cfo_id);
 N   ALTER TABLE ONLY public.cashflowobjects DROP CONSTRAINT cashflowobjects_pkey;
       public            postgres    false    211            ?           2606    34460    categories categories_pkey 
   CONSTRAINT     a   ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);
 D   ALTER TABLE ONLY public.categories DROP CONSTRAINT categories_pkey;
       public            postgres    false    212            ?           2606    34541 ;   cfo_data cfo_data__month__year_cfo_id_status_isforecast_key 
   CONSTRAINT     ?   ALTER TABLE ONLY public.cfo_data
    ADD CONSTRAINT cfo_data__month__year_cfo_id_status_isforecast_key UNIQUE (_month, _year, cfo_id, status, isforecast);
 e   ALTER TABLE ONLY public.cfo_data DROP CONSTRAINT cfo_data__month__year_cfo_id_status_isforecast_key;
       public            postgres    false    219    219    219    219    219            ?           2606    34465    country country_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (country_id);
 >   ALTER TABLE ONLY public.country DROP CONSTRAINT country_pkey;
       public            postgres    false    213            ?           2606    34470    geographies geographies_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.geographies
    ADD CONSTRAINT geographies_pkey PRIMARY KEY (geo_id);
 F   ALTER TABLE ONLY public.geographies DROP CONSTRAINT geographies_pkey;
       public            postgres    false    214            ?           2606    34475 "   mapping_master mapping_master_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.mapping_master
    ADD CONSTRAINT mapping_master_pkey PRIMARY KEY (map_id);
 L   ALTER TABLE ONLY public.mapping_master DROP CONSTRAINT mapping_master_pkey;
       public            postgres    false    215            ?           2606    34482    master master_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.master
    ADD CONSTRAINT master_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.master DROP CONSTRAINT master_pkey;
       public            postgres    false    216            ?           2606    34487    rules rules_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.rules
    ADD CONSTRAINT rules_pkey PRIMARY KEY (rule_id);
 :   ALTER TABLE ONLY public.rules DROP CONSTRAINT rules_pkey;
       public            postgres    false    217            ?           2606    34542    cfo_data fk_cfo    FK CONSTRAINT     {   ALTER TABLE ONLY public.cfo_data
    ADD CONSTRAINT fk_cfo FOREIGN KEY (cfo_id) REFERENCES public.cashflowobjects(cfo_id);
 9   ALTER TABLE ONLY public.cfo_data DROP CONSTRAINT fk_cfo;
       public          postgres    false    211    3200    219               ?   x?=ͽ?0?9}
^?(q????
*b?{l???1??>]???`)w??!??@?
?Wt?:??˺5?ej?q?9??+a???B%&'?Qa2?????7F?ځܸ
? ????a??Qͼ?f???1E?4fdpc?E???Us?ɜ???y???q??7??6?            x?????? ? ?      %   ?   x???9nE!???w/D?a2{I?ܦ??n"?TV?(?d?J??V?ֻ͠2ң????}m?[??J??$|z'??|?Bd??NA|??I?I?ID'??H7?5?????<C??
X?? Yg_?r???[?>AO???v
?'|??M????hN?>??F?????ʻ???sYhR0`V'??D?O?Y??id?W??Z+?C??\??
7?            x?????? ? ?         0   x?3?,???tH,J???MM?,????,H,.??sz???p??qqq (??             x?????? ? ?      !      x?????? ? ?      "      x?????? ? ?      #      x?????? ? ?     