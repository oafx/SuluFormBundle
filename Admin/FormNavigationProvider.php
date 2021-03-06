<?php

namespace Sulu\Bundle\FormBundle\Admin;

use Sulu\Bundle\AdminBundle\Navigation\ContentNavigationItem;
use Sulu\Bundle\AdminBundle\Navigation\ContentNavigationProviderInterface;

/**
 * Generated by https://github.com/alexander-schranz/sulu-backend-bundle.
 */
class FormNavigationProvider implements ContentNavigationProviderInterface
{
    /**
     * {@inheritdoc}
     */
    public function getNavigationItems(array $options = [])
    {
        $navigationItems = [];

        $navigationItems['detail'] = new ContentNavigationItem('sulu_form.navigation.details');
        $navigationItems['detail']->setAction('general');
        $navigationItems['detail']->setComponent('forms@suluform');
        $navigationItems['detail']->setComponentOptions([
            'display' => 'form',
            'content' => 'general',
        ]);

        return $navigationItems;
    }
}
