import express from 'express';
import { Client, Coach, Comment, Stats } from '../src/models/models.js';
import { isAuthenticated } from './middleware.js';