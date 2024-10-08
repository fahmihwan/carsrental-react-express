PGDMP                          |            dbcarrental %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1) %   14.13 (Ubuntu 14.13-0ubuntu0.22.04.1) 7    Y           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            Z           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            [           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            \           1262    16384    dbcarrental    DATABASE     `   CREATE DATABASE dbcarrental WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE dbcarrental;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                postgres    false            ]           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   postgres    false    3            P           1247    19176    Type_features    TYPE     n   CREATE TYPE public."Type_features" AS ENUM (
    'PASSENGERS',
    'DOORS',
    'BAGS',
    'TRANSMISSION'
);
 "   DROP TYPE public."Type_features";
       public          postgres    false    3            �            1259    16404    bookings    TABLE       CREATE TABLE public.bookings (
    id integer NOT NULL,
    statusenabled boolean NOT NULL,
    user_id integer NOT NULL,
    cars_owner_id integer NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    dropoff_location character varying(255),
    dropoff_schedule timestamp(3) with time zone NOT NULL,
    pickup_location character varying(255),
    pickup_schedule timestamp(3) with time zone NOT NULL,
    m_bank character varying(20),
    m_bill_key character varying(100),
    m_biller_code character varying(100),
    m_expiry_time timestamp(3) without time zone,
    m_fraud_status character varying(50),
    m_gross_amount integer,
    m_merchant_id character varying(255),
    m_order_id character varying(255),
    m_payment_type character varying(100),
    m_permata_va_number character varying(100),
    m_transaction_id character varying(255),
    m_transaction_status character varying(50),
    m_va_number character varying(100),
    m_settlement_time timestamp(3) without time zone
);
    DROP TABLE public.bookings;
       public         heap    postgres    false    3            �            1259    16403    bookings_id_seq    SEQUENCE     �   CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.bookings_id_seq;
       public          postgres    false    214    3            ^           0    0    bookings_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;
          public          postgres    false    213            �            1259    16432    car_features    TABLE     �   CREATE TABLE public.car_features (
    id integer NOT NULL,
    statusenabled boolean NOT NULL,
    cars_owner_id integer NOT NULL,
    features_id integer NOT NULL
);
     DROP TABLE public.car_features;
       public         heap    postgres    false    3            �            1259    16431    car_features_id_seq    SEQUENCE     �   CREATE SEQUENCE public.car_features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.car_features_id_seq;
       public          postgres    false    3    216            _           0    0    car_features_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.car_features_id_seq OWNED BY public.car_features.id;
          public          postgres    false    215            �            1259    16396    cars_owners    TABLE     �  CREATE TABLE public.cars_owners (
    id integer NOT NULL,
    statusenabled boolean NOT NULL,
    user_id integer NOT NULL,
    daily_rental_price integer NOT NULL,
    merk character varying(255),
    year character varying(4),
    license_plate character varying(10),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    address character varying(255),
    file character varying(255)
);
    DROP TABLE public.cars_owners;
       public         heap    postgres    false    3            �            1259    16395    cars_owners_id_seq    SEQUENCE     �   CREATE SEQUENCE public.cars_owners_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.cars_owners_id_seq;
       public          postgres    false    212    3            `           0    0    cars_owners_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.cars_owners_id_seq OWNED BY public.cars_owners.id;
          public          postgres    false    211            �            1259    16439    features    TABLE     :  CREATE TABLE public.features (
    id integer NOT NULL,
    statusenabled boolean NOT NULL,
    features_name character varying(255),
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    type_features public."Type_features" DEFAULT 'PASSENGERS'::public."Type_features" NOT NULL
);
    DROP TABLE public.features;
       public         heap    postgres    false    848    848    3            �            1259    16438    features_id_seq    SEQUENCE     �   CREATE SEQUENCE public.features_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.features_id_seq;
       public          postgres    false    218    3            a           0    0    features_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.features_id_seq OWNED BY public.features.id;
          public          postgres    false    217            �            1259    19193    logging    TABLE     Q   CREATE TABLE public.logging (
    id integer NOT NULL,
    logs text NOT NULL
);
    DROP TABLE public.logging;
       public         heap    postgres    false    3            �            1259    19192    logging_id_seq    SEQUENCE     �   CREATE SEQUENCE public.logging_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.logging_id_seq;
       public          postgres    false    220    3            b           0    0    logging_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.logging_id_seq OWNED BY public.logging.id;
          public          postgres    false    219            �            1259    16386    users    TABLE     �  CREATE TABLE public.users (
    id integer NOT NULL,
    statusenabled boolean NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    username character varying(255),
    email character varying(255) NOT NULL,
    phonenumber character varying(255) NOT NULL,
    password character varying(255),
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);
    DROP TABLE public.users;
       public         heap    postgres    false    3            �            1259    16385    users_id_seq    SEQUENCE     �   CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    210    3            c           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    209            �           2604    16407    bookings id    DEFAULT     j   ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);
 :   ALTER TABLE public.bookings ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    214    213    214            �           2604    16435    car_features id    DEFAULT     r   ALTER TABLE ONLY public.car_features ALTER COLUMN id SET DEFAULT nextval('public.car_features_id_seq'::regclass);
 >   ALTER TABLE public.car_features ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216            �           2604    16399    cars_owners id    DEFAULT     p   ALTER TABLE ONLY public.cars_owners ALTER COLUMN id SET DEFAULT nextval('public.cars_owners_id_seq'::regclass);
 =   ALTER TABLE public.cars_owners ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    211    212    212            �           2604    16442    features id    DEFAULT     j   ALTER TABLE ONLY public.features ALTER COLUMN id SET DEFAULT nextval('public.features_id_seq'::regclass);
 :   ALTER TABLE public.features ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    218    218            �           2604    19196 
   logging id    DEFAULT     h   ALTER TABLE ONLY public.logging ALTER COLUMN id SET DEFAULT nextval('public.logging_id_seq'::regclass);
 9   ALTER TABLE public.logging ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    220    219    220            �           2604    16389    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            P          0    16404    bookings 
   TABLE DATA           y  COPY public.bookings (id, statusenabled, user_id, cars_owner_id, created_at, dropoff_location, dropoff_schedule, pickup_location, pickup_schedule, m_bank, m_bill_key, m_biller_code, m_expiry_time, m_fraud_status, m_gross_amount, m_merchant_id, m_order_id, m_payment_type, m_permata_va_number, m_transaction_id, m_transaction_status, m_va_number, m_settlement_time) FROM stdin;
    public          postgres    false    214   �D       R          0    16432    car_features 
   TABLE DATA           U   COPY public.car_features (id, statusenabled, cars_owner_id, features_id) FROM stdin;
    public          postgres    false    216   �N       N          0    16396    cars_owners 
   TABLE DATA           �   COPY public.cars_owners (id, statusenabled, user_id, daily_rental_price, merk, year, license_plate, created_at, address, file) FROM stdin;
    public          postgres    false    212   �N       T          0    16439    features 
   TABLE DATA           _   COPY public.features (id, statusenabled, features_name, created_at, type_features) FROM stdin;
    public          postgres    false    218   ?Q       V          0    19193    logging 
   TABLE DATA           +   COPY public.logging (id, logs) FROM stdin;
    public          postgres    false    220   �Q       L          0    16386    users 
   TABLE DATA           �   COPY public.users (id, statusenabled, first_name, last_name, username, email, phonenumber, password, "createdAt", "updatedAt") FROM stdin;
    public          postgres    false    210   $X       d           0    0    bookings_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.bookings_id_seq', 41, true);
          public          postgres    false    213            e           0    0    car_features_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.car_features_id_seq', 45, true);
          public          postgres    false    215            f           0    0    cars_owners_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.cars_owners_id_seq', 47, true);
          public          postgres    false    211            g           0    0    features_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.features_id_seq', 9, true);
          public          postgres    false    217            h           0    0    logging_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.logging_id_seq', 53, true);
          public          postgres    false    219            i           0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    209            �           2606    16412    bookings bookings_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_pkey;
       public            postgres    false    214            �           2606    16437    car_features car_features_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.car_features
    ADD CONSTRAINT car_features_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.car_features DROP CONSTRAINT car_features_pkey;
       public            postgres    false    216            �           2606    16402    cars_owners cars_owners_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.cars_owners
    ADD CONSTRAINT cars_owners_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.cars_owners DROP CONSTRAINT cars_owners_pkey;
       public            postgres    false    212            �           2606    16445    features features_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.features
    ADD CONSTRAINT features_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.features DROP CONSTRAINT features_pkey;
       public            postgres    false    218            �           2606    19200    logging logging_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.logging
    ADD CONSTRAINT logging_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.logging DROP CONSTRAINT logging_pkey;
       public            postgres    false    220            �           2606    16394    users users_pkey 
   CONSTRAINT     N   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
 :   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pkey;
       public            postgres    false    210            �           1259    16413    email    INDEX     ?   CREATE UNIQUE INDEX email ON public.users USING btree (email);
    DROP INDEX public.email;
       public            postgres    false    210            �           2606    16424 $   bookings bookings_cars_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_cars_owner_id_fkey FOREIGN KEY (cars_owner_id) REFERENCES public.cars_owners(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_cars_owner_id_fkey;
       public          postgres    false    214    212    3250            �           2606    16419    bookings bookings_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 H   ALTER TABLE ONLY public.bookings DROP CONSTRAINT bookings_user_id_fkey;
       public          postgres    false    3248    214    210            �           2606    16451 ,   car_features car_features_cars_owner_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_features
    ADD CONSTRAINT car_features_cars_owner_id_fkey FOREIGN KEY (cars_owner_id) REFERENCES public.cars_owners(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 V   ALTER TABLE ONLY public.car_features DROP CONSTRAINT car_features_cars_owner_id_fkey;
       public          postgres    false    3250    216    212            �           2606    16456 *   car_features car_features_features_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.car_features
    ADD CONSTRAINT car_features_features_id_fkey FOREIGN KEY (features_id) REFERENCES public.features(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 T   ALTER TABLE ONLY public.car_features DROP CONSTRAINT car_features_features_id_fkey;
       public          postgres    false    3256    218    216            �           2606    16414 $   cars_owners cars_owners_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cars_owners
    ADD CONSTRAINT cars_owners_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE RESTRICT;
 N   ALTER TABLE ONLY public.cars_owners DROP CONSTRAINT cars_owners_user_id_fkey;
       public          postgres    false    3248    212    210            P   �	  x�͙Oo����O�{��U�"�f A��`${\ ��d���X;����#9�t��=�dY�dhZd����{l�':�S�A���|����ᬙN�}����.$
�h�W�N_�p~�S���?���7�:?��_?���?�Z�[�%����?}�����"��6�Jk�������w1D�$K<iI]��ɚ���K���I�G�Ӛ?�����Sy�~���%���8��D5��Ws�<S��������o��ҶE&���o�6P�)��/�.��d7� �/j�3����vW�V����~�$;N!w�ű&vBw��p�K�3��f�s�Cy�y�j�N:̭�+)ik,�>r��XlC6D��3�ͼx;��,"�����CTR���.f�N|SWzHN�=sc��#��J��\ԓTQ
����5{/����2�"�{�}���UI�ϨO��pAR����=��3�V��l����"�9i)��[w�V�V�HM�3R/�[��F����"(w9�x+I�8�ǵ��$�B�(�P�>:�^\���4����A�i�t��7�\j���X��Ԅ嶎"g�1�}a���3g~F����H�ӗ���I����FU �ix=���Zon��Q}a	S-��i��^���״1�ǌ�,����i���(��n���2�V�1�k�<Dh0��#t��ס�	S%�"MhO���H��쀑\0���"/<������P��]�s�5�5��b�i�4�#F�g�@��6a&D�X���K�K�f�y�rգt������������0kx��%�Q��ۓ�J��C��d��lL�c���\�\])ԗ?B���Q��I6Fy�~��E�Y9�4����3ʕ8��6	�8�	_�Hs�&i�@���i�<�6��Z)�9F��,�Z��?d$��l�Qz�~��|���n���h[�	�d���)�(gvէ
��arg�-H6tk��П	Ɏ�$0�>PC)Uo���4E���p� �O�;��{F���i��Ó��"W�GA�#�S�Y@6�1b�
,$l�V�P/4����a*7��6F2���gK�r��3z\�>#kO����LQ=�EPV)ԑ���A��VF����()���Tfȡc�ߌ~�!ӕ�2�pQ�5���h[�>�n+���b,I��G}`�d��=�o0B�m�q�l�we�n�A��[�7�_BD-Fr�7��Hԯ�h�}�<"�i��V��<z`6��g�2��ጌ�d����w#�J�={��^��٣p`!�Ϡ�<���G/�h[�F�̜�hf���uvA{gp5�Z@���`�a<��z+\w�s����7��cDE��zMW��{)�l�����_���퟿}����#�=��/����o�~r��@z!���n��Ϲ�wWP�ww���U&J��@3�l��V5q��P�@����*'�\� bq36?&r`�7�|6�[�����������@�gT�r��J�}�W�z�~8�����A7&�)N�l��R����j1n��>}��?�=�'@.<�8u	{�r��� �)
>sE��S�ۑ��4�0�ǁ�4��෢�����+?�A�DW=��V���z{in��ϙ^C����3��Ю.rC��`2]�~0õs8("�Sր@Ӽ@�&!�v\�a��6"�ޏ~��><�����<
+�jZa%�˻�ǵ�c�p�&ALt�4LfCX��6��љw\#i3FN�����h�Z�2�귘��^�啫�#Z�s��n��t��}N-�%��iw�ݥJ��h��PtMuR��4��p �W7����3F���
i��WHa�y�O�C)|r콧gI�P��C��L��z_Z��c#>Pn>�hU�,�q��&�F�F��²�;�����˻\w�$��8{Jk���L��͆k���<S�n�α[��<�e���_�O���S&LO�(��)!����w��JI/^�~��W��՟q���>���Y�g=9��0�b��&���)�_�9�zhq�7�	.戌�9T�qJ0	�G(��-%������7��I6�A��c�q\mI�E c�U�,P��[�G ZWqW,N7���/��H�iK�K6W�kb�پL׾v����,qB-�pm8.�R#c�{"��c��[��\B��� �"Z�xs����Fqg�6�b���q�)n�{f:D/9�)�7RP��f" A1���FF3�ӶG�h�Yh�	�B7����x�;k�QT�t��H��X�I��V�fAG�<�S.b^������1[�	G.�44�`]o��N%��ݹ�+E����L�kw�)�V���X�Л�'�����/,�(�)���c�
� si����>k���jH9]dȑ���k�ЗX���=S���d-�ed���δ�L�+Qab$�	[9V�#w�ϥ����")�n�(�x��:=K�_ŧ�=7\�1� ���.ʮk�̵޴�"��5 P �CL�����\+NPbɹ�"X$x���|w~���� BQ2      R   P   x�%��	�0ѳ��`I�_/)#���|{00a�k����V�QP��%�L��t
�p�h���g��x�8����^�_      N   E  x���ao�0�?�_q�w2��$v�U2%[)�U�iڗ�d,J*��_�sBE��Y�Gv���;[z��;�5�Y�Y�Ψw��p��i"�Lw� �B�!2W
ϙ��&�&f���Cӛ�ѧ�&��h��$f�� }侖L�v��EG�ے�鎊��XJ�j�_��3}F1��ߢ�Y(�B�\���>�W�kQؠВ�Kz�;Z�@��Q~��E�v����at7��![�81���	�)�
�rj�6�I�X�)������LV��[	��=�J
��=�?���I҄�����4Qc˕�5�������l�������|��bG��7�d��wE��LLhI?!r��[�MUf)��譊
�-�-�@	\��>'�@yR�t�н���V���W�i��Jୄ^����@���{���H[ռ��7��stF@t����ȁ�{���t�)r?�i2N�v���х�-w{]���$�K�2�K��(p������!���Y� ��q������/Vզ̺�jY�B�W�t���
lVe��`l}d�����7���K�&�\b��jOt�J�� h�~s;��?1�B�      T   �   x��α�0��}�� .� [5�0�n.��DJb���хD��w��3MM�c�@%ER�E��%�8�#;�9��n$�?�(Ī��y�L]M��i�߀<��ͯ��.̋�[f����jӫu��t-?��n���P���Ŝ�7�R�      V   .  x��Oo����0t^�*�+]� �-H�\��@�����H�1���Z�D����-v �@�l��_�������~�=\�k��3��웳��}/�w���hM3W3�Ң���=�^�z!�{��>.�����Q�ϻ�)��~����ݟ�p�7��8{���r(2f��b�9��`I7���Ǐ7�RG�}wq���{t.��p+{��η���[ⵖJ�^W��Y�yشR�z*"��5q�圣i�8FN�K�\KJ-Ej���Ϋ�f:j͙�%I�pkV��*5.�B>Df��}��g�������k�o�����7[��O����~�ۿܢ�p���O�|{yx�����\�~��cw�v��KlISA�?����j�W���w��m��?�C�]<����~��a���6�۟�����N!j z��9mW}��O�%F����r���b�a��$��~�������%f�k�pi}[������yߎ{E#��;�wq����:�d/YC�֣�0��0y��ų�rֻ���Q(K)$ß�Kg3ў|�����/��Ps�@9ua��h�CRӼ{[}��K�k�ޓ���Eײ^FL�z�RVոh���L���8�gY}H]�g�чƜlP=M�E
d����}눓���sTy9��U�_u�t=?T�Ӱ�J�����0Jȅs�B�l�rP��9��{H�z��14�R���j����r��I�u.ͽ�U�X=F���V�/�h�èO��(�dJeT��@؀��Hi՞5-B�1����b��(Q�5OT�9qay����9�LrN�	P����P�1P��3��!A^Bg�gN2j����(f=�KGаtdCSkK�t�P=�n�}38<z"�S-��S�zN}9z�y���I^��mm�:�=ք�!ŇA�V�u���4�����S�Hl.���>���r���HiMYsz��"�?e	�c@_}�L�"},�lզ�����{��ӓgx��ʒ[�5�!���؀תl�IH�D��K^l�����6#�ho�Z���k��L~5 �������g��^A}�@��
�B:�
)?vD�����2� �Y��$����V@H�U{�L�Q!umư��r�N�F��j%(���ڄ1,���o�2K���ܘ�5o�N5��r��2$Qm;,cU�!�]@�3V�Mi0�np�MPU�V����v{]�ү�x&|�^Bi;O�}w1���}hz��yD	���A�d���c����q���M�y̙e�2���a�w���2=9�v�jG��YDۘ�����,""N���NS&��Oʤ�ǧ���������2I�U�y���<��Z�[F�[���f�~pcfi$�I������l���f�Ť�F��EJ�H�>Z- .�Ey"=C�R��Gx�rB�c*+ͅ�<v.�2�Ŕ�kN_�4iAYa�s��ŕ����y9A�,�-�/�4��z��!I���'ϕ�S��c�r��Ǡ�����wv ��+�ƭ�B0�H�ۄ�i�:�7��D�0&�5�.�*ͣ���9"M���0�l�b����z�2�� ���O?Կ�{��Ϳ���G      L   �   x�-��
�0 �������S��"�T�TPt�s�ta�}!]���P@G�y�ʦ[�𚦱�f@횫��2�Yo\O��#*9� �@������rf�0���%�wPn&i����)_����Z�YQ�ChDUk�\�T�,�0��kF��������"! ?	��`D1i     